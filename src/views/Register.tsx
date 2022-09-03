import { useWallet } from "@solana/wallet-adapter-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { balanceState } from "../states/balanceState";
import { userState } from "../states/userState";
import { Client as DSpace } from "@base32/dspacejs";
import { connection } from "../App";

export const RegisterView: FC = () => {
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
