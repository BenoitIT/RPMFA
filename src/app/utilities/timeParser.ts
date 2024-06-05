export function extractYear(timeString:any) {
    const date = new Date(timeString);
    const year = date.getFullYear();
    return year;
}