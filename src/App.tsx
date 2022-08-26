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

require("@solana/wallet-adapter-react-ui/styles.css");

export const connection = new Connection("https://ssc-dao.genesysgo.net/", {
    commitment: "max",
});

const App: FC = () => {
    return (
        <Context>
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

    const [balances, setBalances] = useState<{
        SOL: number;
        SHDW: number;
    } | null>(null);

    const register = async () => {
        if (!wallet) {
            return;
        }

        setRegistering(true);
        // if registered, we can create the client
        const dspace = await DSpace.create(connection, wallet as any);
        const usrInfo = await dspace.getUserInfo();
        setUser(usrInfo);
        navigate("/");
    };

    useEffect(() => {
        const getBalances = async () => {
            if (!wallet) {
                return;
            }

            const balances = await DSpace.getBalances(
                connection,
                wallet as any
            );
            setBalances(balances);
        };
        getBalances();
    }, [wallet]);

    return (
        <>
            <Navbar RightElement={<WalletMultiButton />} />

            {balances && (
                <div className="Aligner" style={{ height: "80vh" }}>
                    <div className="Aligner-item Aligner-item--top"></div>
                    <div className="Aligner-item bg-gray-100 rounded p-10">
                        {balances && (
                            <h1 className="text-2xl">
                                <strong>{balances.SOL.toFixed(2)}</strong> SOL{" "}
                                <strong>{balances.SHDW.toFixed(2)}</strong> SHDW
                            </h1>
                        )}
                        {balances && balances.SHDW === 0 && (
                            <small className="mb-5 text-red-700">
                                Warning: You need both SOL and SHDW tokens to
                                use this application. Purchase some SHDW tokens{" "}
                                <a
                                    className="font-medium text-blue-600 underline pointer"
                                    href="https://jup.ag/swap/SOL-SHDW"
                                    target="__blank"
                                >
                                    here.
                                </a>{" "}
                                A few dollars is enough.
                            </small>
                        )}
                        <h1 className="text-xl mt-5">
                            Looks like you don't have an account yet. Let's set
                            up your dspace account. This will take two
                            transactions.
                        </h1>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
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
                                {registering ? "Creating..." : "Create Account"}
                            </button>
                        </form>
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

    const navigate = useNavigate();

    const usernamePlaceholder = randomUsername();

    useEffect(() => {
        const getUser = async () => {
            if (!wallet) {
                return;
            }

            if (user === null) {
                // check if user account is registered
                const registered = await (DSpace as any).isRegistered(
                    connection,
                    wallet as any
                );
                if (!registered) {
                    console.warn("Not registered, send to registration page");
                    navigate("/register");
                    return;
                }

                // if registered, we can create the client
                const dspace = await DSpace.create(connection, wallet as any);
                const usrInfo = await dspace.getUserInfo();
                setUser(usrInfo);
            }
        };

        getUser();
    }, [wallet, user, setUser, navigate]);

    return (
        <div className="App">
            <Modal
                open={newUsernameOpen}
                form={
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setSubmittingUsername(true);
                            const dspace = await DSpace.create(
                                connection,
                                wallet as any
                            );
                            await dspace.setUsername(newUsername);
                            // lol, takes a while to propagate or something
                            await sleep(3000);
                            setUser(await dspace.getUserInfo());
                            setSubmittingUsername(false);
                            setNewUsernameOpen(false);
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
                            while.{" "}
                        </p>
                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className={`${
                                    submittingUsername
                                        ? "cursor-not-allowed"
                                        : ""
                                } disabled w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
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
            <Navbar RightElement={<WalletMultiButton />} />
            <div className="container mx-auto mt-6">
                {user && (
                    <p className="text-xl">
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
                    </p>
                )}
                {!user && wallet.connected && (
                    <div className="flex">
                        <div
                            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                            role="status"
                        >
                            <span className="visually-hidden">
                                <strong style={{ fontSize: "22px" }}>.</strong>
                            </span>
                        </div>
                    </div>
                )}

                {!user && !wallet.connected && (
                    <p className="text-xl">
                        <strong>Please connect your wallet to continue.</strong>
                    </p>
                )}
            </div>
        </div>
    );
};
