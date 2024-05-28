"use client";

import { useEffect, useState, useTransition } from "react";

import { CssBaseline, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

// import { useContentfulContext } from "@/hooks/contentful";
import { WithChildren } from "@/types/common";

import { HeaderTemplate } from "../header";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    ...theme.typography.body1,
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export type LayoutTemplateProps = WithChildren;

/**
 * Renders the layout template component.
 * @param children - The children components.
 * @returns The rendered component.
 */
const LayoutTemplate = ({ children }: LayoutTemplateProps) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const classes = useStyles();
  // const { previewActive } = useContentfulContext();

  useEffect(() => {
    startTransition(() => {
      setMenuOpen(false);
    });

    if (!isPending) {
      if (!document.activeElement) {
        return;
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [isPending]);

  return (
    <>
      <CssBaseline />
      <HeaderTemplate
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setMenuOpen(true)}
      />
      <div className={classes.content}>{children}</div>
    </>
  );
};

LayoutTemplate.displayName = "LayoutTemplate";

export default LayoutTemplate;
