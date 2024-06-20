import { Theme } from "@mui/material/styles";

import en from "./messages/en-US.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

declare module "catchify" {
  function catchify<E extends Error, T>(a: Promise<T>): Promise<[E, T]>;
  export default catchify;
}

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}
