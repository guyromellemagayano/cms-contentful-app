"use client";

import { useContext } from "react";

import { ContentfulContext } from "@/contexts/contentful";

/**
 * Custom hook to access the Contentful context.
 * @returns The contentful context.
 */
export const useContentfulContext = () => useContext(ContentfulContext);
