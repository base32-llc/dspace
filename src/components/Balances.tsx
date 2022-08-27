import { useRecoilState } from "recoil";
import { useInterval } from "../hooks/useInterval";
import { balanceState } from "../states/balanceState";
import { Client as DSpace } from "@base32/dspacejs";
import { connection } from "../App";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { sleep } from "../utils/sleep";

export function Balances() {
    const [balances, setBalances] = useRecoilState(balanceState);
    const wallet = useWallet();

    const getBalances = async () => {
        if (!wallet || !wallet.connected) {
            return;
        }

        const balances = await DSpace.getBalances(connection, wallet as any);
        setBalances(balances);
    };

    useInterval(getBalances, 10000);

    useEffect(() => {
        getBalances();
    }, [wallet]);

    if (balances === null) {
        return (
            <div>
                <h1 className="text-sm text-monospace text-white font-mono">
                    <strong>&nbsp;</strong>&nbsp;
                    <strong>&nbsp;</strong>&nbsp;
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-sm text-monospace text-white font-mono">
                <strong>{balances.SOL?.toFixed(2)}</strong> SOL&nbsp;&nbsp;
                <strong>{balances.SHDW?.toFixed(2)}</strong> SHDW
            </h1>
        </div>
    );
}
