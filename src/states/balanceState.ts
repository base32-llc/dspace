import { atom } from "recoil";

export const balanceState = atom({
    key: "balance",
    default: null as {
        SHDW: number;
        SOL: number;
    } | null,
});
