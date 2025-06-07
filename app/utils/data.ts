import { format } from "date-fns";

export const formatDate = (dateInput: Date | string) => {
  const date = new Date(dateInput);
  return format(date, "dd MMM yyyy, hh:mm a");
};
