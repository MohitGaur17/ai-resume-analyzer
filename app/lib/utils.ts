import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

const KB = 1024
const MB = KB * 1024
const GB = MB * 1024

const formatNumber = (value: number) => Number(value.toFixed(2)).toString()

export const formatSize = (bytes: number): string => {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB"

    if (bytes >= GB) return `${formatNumber(bytes / GB)} GB`
    if (bytes >= MB) return `${formatNumber(bytes / MB)} MB`

    return `${formatNumber(bytes / KB)} KB`
}

export const generateUUID = () => crypto.randomUUID();

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}