export function strToIcon(s: string): string {
    const str = s
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .replace(/\s/g, "");

    return `${process.env.PUBLIC_URL}/icons/defaultAvatars/${str
        .substring(0, 2)
        .toUpperCase()}.png`;
}
