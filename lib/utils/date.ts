import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: ptBR,
  });
}