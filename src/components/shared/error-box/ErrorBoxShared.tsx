import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import type { WithAny, WithChildren, WithClassName } from "@/types/common";

const useStyles = makeStyles((theme: Theme) => ({
  errorBoxRoot: {
    color: theme.palette.error.dark,
    border: `1px solid ${theme.palette.error.dark}`,
    padding: theme.spacing(1),
    margin: theme.spacing(12, 0),
  },
}));

export type ErrorBoxSharedProps = WithAny & WithClassName & WithChildren;

/**
 * Renders the shared error box component.
 * @param {ErrorBoxSharedProps} props - The properties to render the component with.
 * @returns The rendered shared component.
 */
const ErrorBoxShared = (props: ErrorBoxSharedProps) => {
  const { className, children, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.errorBoxRoot, className)} {...rest}>
      <Typography variant="body1">{children}</Typography>
    </div>
  );
};

ErrorBoxShared.displayName = "ErrorBoxShared";

export default ErrorBoxShared;
