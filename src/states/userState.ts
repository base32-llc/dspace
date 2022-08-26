import { User } from "../types";
import { atom } from "recoil";

export const userState = atom({
    key: "user",
    default: null as null | User,
});
