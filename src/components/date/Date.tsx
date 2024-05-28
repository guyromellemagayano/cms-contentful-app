import { format } from "date-fns";

export type DateComponentProps = {
  dateString: string;
};

/**
 * Renders a date component.
 * @param dateString - The date string to be formatted and displayed.
 * @returns The rendered date component.
 */
const DateComponent = ({ dateString }: DateComponentProps) => {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), "LLLL	d, yyyy")}
    </time>
  );
};

DateComponent.displayName = "DateComponent";

export default DateComponent;
