export function convertTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    } as Intl.DateTimeFormatOptions;

    const dateFormat = date.toLocaleDateString("en-US", options);

    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";
    let hour12 = hour > 12 ? hour - 12 : hour;
    if (hour12 === 0) hour12 = 12;

    const timeFormat = `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;

    return `${dateFormat} - ${timeFormat}`;
  }