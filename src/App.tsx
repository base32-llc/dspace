import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    useWallet,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { Client as DSpace, randomUsername } from "@base32/dspacejs";
import { useRecoilState } from "recoil";
import { userState } from "./states/userState";
import { Navbar } from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Modal } from "./components/Modal";
import { sleep } from "./utils/sleep";
import toast, { Toaster } from "react-hot-toast";
import { balanceState } from "./states/balanceState";
import { Balances } from "./components/Balances";
import { FileUploader } from "./components/FileUploader";
import { strToIcon } from "./utils/strToIcon";

require("@solana/wallet-adapter-react-ui/styles.css");

export const connection = new Connection("https://ssc-dao.genesysgo.net/", {
    commitment: "max",
});

const App: FC = () => {
    return (
        <Context>
            <Toaster position="bottom-left" />
            <Navbar
                RightElement={
                    <>
                        <WalletMultiButton />
                        <br />
                        <Balances />
                    </>
                }
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const RegisterPage: FC = () => {
    const wallet = useWallet();
    const [, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const [registering, setRegistering] = useState(false);

    const [balances] = useRecoilState(balanceState);

    const register = async () => {
        if (!wallet || !wallet.connected) {
            return;
        }

        const toastId = toast.loading("Setting up dspace account...");
        setRegistering(true);
        // if registered, we can create the client
        try {
            const dspace = await DSpace.create(connection, wallet as any);
            const usrInfo = await dspace.getUserInfo();
            toast.success("Account set up successfully!", {
                id: toastId,
            });
            setUser(usrInfo);
            navigate("/");
        } catch (err) {
            toast.error(
                "Error setting up dspace account: " + (err as any).toString(),
                {
                    id: toastId,
                }
            );
        }
    };

    return (
        <>
            {balances && (
                <div className="Aligner" style={{ height: "80vh" }}>
                    <div className="Aligner-item Aligner-item--top"></div>
                    <div className="Aligner-item bg-gray-100 rounded p-10">
                        <h1 className="text-2xl font-bold">Account Setup</h1>
                        {balances &&
                            (balances.SHDW === 0 || balances.SOL === 0) && (
                                <p className="mt-5 text-red-700">
                                    You need both SOL and SHDW tokens to use
                                    this application. You will not be able to
                                    continue until you have some. Purchase some
                                    SHDW tokens{" "}
                                    <a
                                        className="font-medium text-blue-600 underline pointer"
                                        href="https://jup.ag/swap/SOL-SHDW"
                                        target="__blank"
                                    >
                                        here.
                                    </a>{" "}
                                    A few dollars is enough.
                                </p>
                            )}
                        {balances && balances.SHDW > 0 && balances.SOL > 0 && (
                            <h1 className="text-xl mt-5">
                                Welcome to dspace. Let's set up your account.
                                This will take two transactions.
                            </h1>
                        )}

                        {balances && balances.SHDW > 0 && balances.SOL > 0 && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (
                                        balances.SOL === 0 ||
                                        balances.SHDW === 0
                                    ) {
                                        return;
                                    }
                                    register();
                                }}
                            >
                                <button
                                    type="submit"
                                    style={{ float: "right" }}
                                    className={`loading bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-5 ${
                                        registering ? "cursor-not-allowed" : ""
                                    }`}
                                >
                                    {registering
                                        ? "Creating..."
                                        : "Create Account"}
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="Aligner-item Aligner-item--bottom"></div>
                </div>
            )}
        </>
    );
};

const HomePage: FC = () => {
    const wallet = useWallet();
    const [user, setUser] = useRecoilState(userState);

    const [newUsernameOpen, setNewUsernameOpen] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [submittingUsername, setSubmittingUsername] = useState(false);

    const [newPfpOpen, setNewPfpOpen] = useState(false);
    const navigate = useNavigate();

    const usernamePlaceholder = randomUsername();

    useEffect(() => {
        const getUser = async () => {
            if (!wallet || !wallet.connected) {
                return;
            }

            if (user === null) {
                const toastId = toast.loading("Logging in to dspace...");
                // check if user account is registered

                try {
                    const registered = await (DSpace as any).isRegistered(
                        connection,
                        wallet as any
                    );
                    if (!registered) {
                        console.warn(
                            "Not registered, send to registration page"
                        );
                        toast.error(
                            "You aren't registered for dspace yet. Please make an account.",
                            {
                                id: toastId,
                            }
                        );
                        navigate("/register");
                        return;
                    }
                } catch (err) {
                    toast.error(
                        "Error occured when searching for account: " +
                            (err as any).toString(),
                        {
                            id: toastId,
                        }
                    );
                }

                // if registered, we can create the client
                try {
                    const dspace = await DSpace.create(
                        connection,
                        wallet as any
                    );
                    const usrInfo = await dspace.getUserInfo();
                    toast.success("Logged in successfully!", {
                        id: toastId,
                    });
                    setUser(usrInfo);
                } catch (err) {
                    toast.error(
                        "Error occured when logging in: " +
                            (err as any).toString(),
                        {
                            id: toastId,
                        }
                    );
                }
            }
        };

        getUser();
    }, [wallet, user, setUser, navigate]);

    return (
        <div className="App">
            <Modal
                open={newPfpOpen}
                close={() => setNewPfpOpen(false)}
                title="Change Profile Picture"
                form={
                    <div className="inline-flex justify-center content-center mx-auto">
                        <FileUploader
                            onUpload={async (f) => {
                                const toastId = toast.loading(
                                    "Uploading profile picture..."
                                );
                                try {
                                    if (!user) {
                                        toast.error(
                                            "User is not logged in, try refreshing the page",
                                            {
                                                id: toastId,
                                            }
                                        );
                                        return;
                                    }
                                    const dspace = await DSpace.create(
                                        connection,
                                        wallet as any
                                    );
                                    await dspace.setPFP(f);
                                    toast.success(
                                        "Profile picture uploaded successfully!",
                                        {
                                            id: toastId,
                                        }
                                    );
                                    const newUser = { ...user };
                                    setUser(newUser);
                                    setNewPfpOpen(false);
                                } catch (err) {
                                    toast.error(
                                        "Error occured when uploading profile picture: " +
                                            (err as any).toString(),
                                        {
                                            id: toastId,
                                        }
                                    );
                                }
                            }}
                        />
                        <br />
                    </div>
                }
            />
            <Modal
                open={newUsernameOpen}
                close={() => setNewUsernameOpen(false)}
                title="Change Username"
                form={
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            if (submittingUsername) {
                                return;
                            }

                            setSubmittingUsername(true);
                            const toastId = toast.loading(
                                "Changing username to " + newUsername + "..."
                            );

                            try {
                                const dspace = await DSpace.create(
                                    connection,
                                    wallet as any
                                );
                                await dspace.setUsername(newUsername);
                                if (user) {
                                    const newUser = { ...user };
                                    newUser.username = newUsername;
                                    setUser(newUser);
                                }
                                setSubmittingUsername(false);
                                setNewUsernameOpen(false);
                                toast.success(
                                    "Username changed successfully!",
                                    {
                                        id: toastId,
                                    }
                                );
                            } catch (err) {
                                setSubmittingUsername(false);
                                toast.error(
                                    "Error changing username: " +
                                        (err as any).toString(),
                                    {
                                        id: toastId,
                                    }
                                );
                            }
                        }}
                    >
                        <label
                            htmlFor="helper-text"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            New username
                        </label>
                        <input
                            type="username"
                            id="helper-text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={usernamePlaceholder}
                        />
                        <p
                            id="helper-text-explanation"
                            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                            You can change your username for dspace to whatever
                            you desire. Usernames over 32 characters will be
                            truncated when displayed. This can take a little
                            while to propagate through the network.{" "}
                        </p>
                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className={`${
                                    submittingUsername
                                        ? "cursor-not-allowed"
                                        : ""
                                } disabled w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm`}
                            >
                                {submittingUsername
                                    ? "Submitting..."
                                    : "Submit"}
                            </button>
                            <button
                                onClick={() => {
                                    setNewUsernameOpen(false);
                                }}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                }
            />
            <div className="container mx-auto mt-6">
                {user && (
                    <div className="text-xl text-center">
                        <img
                            onClick={() => {
                                setNewPfpOpen(true);
                            }}
                            style={{
                                display: "inline-block",
                                marginRight: "0.5rem",
                            }}
                            className="pointer rounded-full h-12 hover:opacity-90"
                            src={user.pfp ? user.pfp : strToIcon(user.username)}
                            alt={user.username}
                        />
                        <strong>@{user.username}</strong>
                        <svg
                            style={{
                                display: "inline-block",
                                marginLeft: "2px",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-gray-700 pointer w-5 h-5"
                            onClick={() => {
                                setNewUsernameOpen(true);
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </div>
                )}
                {!user && wallet.connected && <div />}

                {!user && !wallet.connected && (
                    <p className="text-xl text-center">
                        <strong>Please connect your wallet to continue.</strong>
                    </p>
                )}
            </div>
        </div>
    );
};
