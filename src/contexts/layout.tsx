"use client";

import { createContext } from "react";

import { WithAny } from "@/types/common";

export type LayoutContextValueProps = WithAny & {
  containerWidth: number;
  parent: string;
};

export const layoutContextValues = {
  containerWidth: 770,
  parent: "",
} as LayoutContextValueProps;

export const LayoutContext =
  createContext<LayoutContextValueProps>(layoutContextValues);
