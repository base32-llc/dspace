import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
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
import { FC, ReactNode, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Balances } from "./components/Balances";
import { RegisterView } from "./views/Register";
import { HomeView } from "./views/Home";

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
                <Route path="/" element={<HomeView />} />
                <Route path="/register" element={<RegisterView />} />
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
