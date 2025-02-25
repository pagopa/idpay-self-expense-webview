import { format } from "date-fns";
import { it } from "date-fns/locale";

export function formatCustomDate(dateString: string | Date): string {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { locale: it });
}