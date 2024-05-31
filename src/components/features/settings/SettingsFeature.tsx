"use client";

import { useEffect, useState } from "react";

import { Theme, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CSSTransition } from "react-transition-group";

import { SettingsIcon } from "@/components/svg/icons";

import { FormSettingsFeature } from "./form";

const useStyles = makeStyles((theme: Theme) => ({
  toggle: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "#192737",
    border: 0,
    borderRadius: "50%",
    bottom: theme.spacing(3),
    boxShadow: "0 2px 6px rgba(0,0,0,0.29)",
    cursor: "pointer",
    display: "flex",
    height: "6rem",
    justifyContent: "center",
    position: "fixed",
    right: theme.spacing(3),
    width: "6rem",
    zIndex: 1130,
    [theme.breakpoints.up("md")]: {
      bottom: theme.spacing(9),
      right: theme.spacing(9),
    },
  },
  toggleImage: {
    display: "block",
    transform: "translateX(-1px)",
    width: "3rem",
  },
  animationEnter: {
    opacity: 0,
    transform: "scale(0.1)",
    transformOrigin: "bottom right",
  },
  animationEnterActive: {
    opacity: 1,
    transform: "translateX(0)",
    transition: "opacity 300ms, transform 300ms",
  },
  animationExit: {
    opacity: 1,
  },
  animationExitActive: {
    opacity: 0,
    transform: "scale(0.1)",
    transformOrigin: "bottom right",
    transition: "opacity 300ms, transform 300ms",
  },
}));

/**
 * Renders the settings feature component.
 * @returns The rendered feature component.
 */
const SettingsFeature = () => {
  const [enabled, setEnabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  // Handles the scroll lock behavior when the settings are open or closed.
  // Adds or removes the "is-scroll-locked" class to the body element based on the settingsOpen state and the current screen size.
  useEffect(() => {
    if (!settingsOpen) {
      document.body.classList.remove("is-scroll-locked");
      return;
    }

    if (
      window.matchMedia(theme.breakpoints.up("md").replace("@media ", ""))
        .matches === true
    ) {
      return;
    }

    document.body.classList.add("is-scroll-locked");
  }, [settingsOpen, theme.breakpoints]);

  useEffect(() => {
    if (window.top?.location.href === window.location.href) {
      setEnabled(true);
    }

    return;
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <CSSTransition
        in={settingsOpen}
        unmountOnExit
        timeout={300}
        classNames={{
          enter: classes.animationEnter,
          enterActive: classes.animationEnterActive,
          exit: classes.animationExit,
          exitActive: classes.animationExitActive,
        }}
      >
        <FormSettingsFeature
          onClose={() => {
            setSettingsOpen(false);
          }}
        />
      </CSSTransition>
      <button
        type="button"
        className={classes.toggle}
        onClick={() => {
          setSettingsOpen((open) => !open);
        }}
        title="Toggle editorial toolbox"
      >
        <SettingsIcon className={classes.toggleImage} />
      </button>
    </>
  );
};

SettingsFeature.displayName = "SettingsFeature";

export default SettingsFeature;
