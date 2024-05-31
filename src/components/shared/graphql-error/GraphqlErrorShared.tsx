"use client";

import { Key, useMemo } from "react";

import { Box, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

import { tryGet } from "@/libs/utils";
import type { WithAny } from "@/types/common";

// TODO: add other errors than only `NetworkError`

export type GraphqlErrorSharedProps = WithAny & {
  error: ErrorData;
};

export type ErrorData = WithAny & {
  message: string;
  graphQLErrors: Array<GraphQLErrorsData>;
  networkError: NetworkErrorData;
};

export type GraphQLErrorsData = WithAny & {
  message: string;
  path: Array<any>;
};

export type NetworkErrorData = WithAny & {
  result: ResultErrorsData;
};

export type ResultErrorsData = WithAny & {
  message: string;
  path: Array<any>;
};

/**
 * Renders the shared GraphQL error component.
 * @param {GraphqlErrorSharedProps} props - The properties to render the component with.
 * @returns The rendered shared component.
 */
const SharedGraphqlError = (props: GraphqlErrorSharedProps) => {
  const { error, ...rest } = props;

  console.error({ error });

  const theme = useTheme<Theme>();
  const networkErrors = useMemo(
    () => tryGet(() => error.networkError.result.errors),
    [error]
  ) as Array<ResultErrorsData>;

  return (
    <Box
      p={4}
      color={theme.palette.error.main}
      border={1}
      borderColor={theme.palette.error.main}
      {...rest}
    >
      <Typography variant="h3">{error.message}</Typography>

      {networkErrors && networkErrors?.length > 0 && (
        <Box my={4}>
          <Typography variant="h4">Network Errors</Typography>

          {networkErrors.map(
            (
              err: {
                message: string;
              },
              i: Key | null | undefined
            ) => (
              <Typography variant="body1" key={i}>
                {err.message}
              </Typography>
            )
          )}
        </Box>
      )}

      {error?.graphQLErrors && error?.graphQLErrors?.length > 0 && (
        <Box my={4}>
          <Typography variant="h4">GraphQl Errors</Typography>

          {error.graphQLErrors.map(
            (
              err: {
                message: string;
                path: any[];
              },
              i: Key | null | undefined
            ) => (
              <Box my={4} key={i}>
                <Typography>{err.message}</Typography>
                <Typography>{`path: ${err.path.join("/")}`}</Typography>
              </Box>
            )
          )}
        </Box>
      )}
    </Box>
  );
};

SharedGraphqlError.displayName = "SharedGraphqlError";

export default SharedGraphqlError;
