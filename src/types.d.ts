export interface Link {
    title: string;
    url: string;
}

export interface User {
    username: string;
    pubkey: string;
    pfp?: string;
    links?: Link[];
}
