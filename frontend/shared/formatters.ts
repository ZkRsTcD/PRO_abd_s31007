

export const formatSecondsToTime = (totalSeconds: number | null | undefined): string => {
    if (totalSeconds === null || totalSeconds === undefined || isNaN(totalSeconds)) {
        return "-";
    }
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor(totalSeconds / 3600);

    const pad = (num: number) => String(num).padStart(2, '0');

    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
}


export const formatDateToString = (date: Date|null): string|undefined => {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
