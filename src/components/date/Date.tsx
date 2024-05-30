import { format } from "date-fns";

import type { WithAny } from "@/types/common";

export type DateComponentProps = WithAny & {
  dateString: string;
};

/**
 * Renders a date component.
 * @param {DateComponentProps} props - The properties to render the component with.
 * @returns The rendered component.
 */
const DateComponent = (props: DateComponentProps) => {
  const { dateString, ...rest } = props;

  return (
    <time dateTime={dateString} {...rest}>
      {format(new Date(dateString), "LLLL	d, yyyy")}
    </time>
  );
};

DateComponent.displayName = "DateComponent";

export default DateComponent;
