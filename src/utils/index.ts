import moment from "moment";

export const dateFormatter = (
  date: Date,
  dateFormat: string = "YYYY-MM-DD HH:mm"
) => {
  return moment(date).format(dateFormat);
};
