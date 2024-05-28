import { ReactNode } from "react";

export type WithAny<T = {}> = T & {
  [key: string]: any;
};

export type WithChildren<T = {}> = T & {
  children: ReactNode;
};

export type WithClassName<T = {}> = T & {
  className?: string;
};

export type WithChildrenAndClassName<T = {}> = WithChildren<WithClassName<T>>;