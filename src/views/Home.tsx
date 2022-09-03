import { randomUsername } from "@base32/dspacejs";
import { useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { Client as DSpace } from "@base32/dspacejs";
import { connection } from "../App";
import { Modal } from "../components/Modal";
import { FileUploader } from "../components/FileUploader";
import { strToIcon } from "../utils/strToIcon";

export const HomeView: FC = () => {
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
                    <>
                        <div className="text-3xl text-center">
                            <img
                                onClick={() => {
                                    setNewPfpOpen(true);
                                }}
                                style={{
                                    display: "inline-block",
                                    marginRight: "0.5rem",
                                }}
                                className="pointer rounded-full h-16 hover:opacity-90"
                                src={
                                    user.pfp
                                        ? user.pfp
                                        : strToIcon(user.username)
                                }
                                alt={user.username}
                            />
                            <strong style={{ marginLeft: "8px" }}>
                                @{user.username}
                            </strong>
                            <svg
                                style={{
                                    display: "inline-block",
                                    marginLeft: "12px",
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
                        <div
                            style={{ paddingLeft: "20%", paddingRight: "20%" }}
                            className="text-center mt-8"
                        >
                            {user.links?.map((link) => (
                                <a href={link.url} target="__blank">
                                    <div className="pointer mb-4 p-5 rounded border-2 border-gray-600	">
                                        {link.title}
                                    </div>
                                </a>
                            ))}
                            <div className="pointer mb-4 p-5 rounded border-2 border-gray-600	">
                                + Add Link
                            </div>
                        </div>
                    </>
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
