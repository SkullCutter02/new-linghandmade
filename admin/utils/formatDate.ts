import { format, parseISO } from "date-fns";

const formatDate = (date: string) => {
  return format(parseISO(date), "do LLL, yyyy");
};

export default formatDate;
