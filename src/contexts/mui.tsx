"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

import { colorfulTheme } from "@/theme";
import { WithChildren } from "@/types/common";

const appRouterCacheProviderSettings = {
  enableCssLayer: true,
};

export type MuiProviderProps = WithChildren;

/**
 * Provides the application with the MUI theme and router cache provider.
 * @param children - The children to render in the provider.
 * @returns The rendered `MuiProvider` component.
 */
const MuiProvider = ({ children }: MuiProviderProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <AppRouterCacheProvider options={appRouterCacheProviderSettings}>
        <ThemeProvider theme={colorfulTheme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </StyledEngineProvider>
  );
};

MuiProvider.displayName = "MuiProvider";

export default MuiProvider;
