"use client";

import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { LinkShared } from "@/components/shared/link";
import { getLinkDisplayText, getLinkHrefPrefix } from "@/libs/utils";
import type { WithAny } from "@/types/common";

import type { NavigationFieldsFragment } from "./__generated/navigation-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    alignItems: "center",
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    alignItems: "center",
    cursor: "default",
    display: "inline-flex",
    fontSize: "1.7rem",
    fontWeight: 400,
    height: "8rem",
    lineHeight: 1.9,
    marginRight: theme.spacing(8),
    position: "relative",

    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(10),
    },

    "& a": {
      cursor: "pointer",
      display: "inline-block",
      transition: "transform 0.2s ease-in-out",
    },

    "&:hover, &:focus, &:focus-within": {
      "& > a": {
        transform: "translateY(-4px)",
      },
      "& $submenu": {
        opacity: 1,
        pointerEvents: "all",
        transform: "translateY(0)",
      },
    },
  },
  submenu: {
    backgroundColor: "#fff",
    boxShadow: "0 3px 6px #00000029",
    borderRadius: "14px",
    left: theme.spacing(10 * -1),
    listStyle: "none",
    opacity: 0,
    padding: theme.spacing(4, 10),
    pointerEvents: "none",
    position: "absolute",
    top: "calc(100% - 2rem)",
    transform: "translateY(20%)",
    transition: "all 0.3s ease-in-out",
  },
  submenuItem: {
    "&:hover, &:focus, &:focus-within": {
      "& > a": {
        transform: "translateY(-4px)",
      },
    },
  },
}));

export type NavigationCtfComponentFeatureProps = WithAny &
  NavigationFieldsFragment;

/**
 * Renders the navigation `contentful` feature component.
 * @param {NavigationFieldsFragment} props - The navigation fields.
 * @returns The rendered `contentful` feature component.
 */
const NavigationCtfComponentFeature = (
  props: NavigationCtfComponentFeatureProps
) => {
  const { items, ...rest } = props;

  const navigationContent = items?.[0] || undefined;

  const classes = useStyles();
  const inspectorMode = useContentfulInspectorMode();

  // Renders the navigation links for a given menu group.
  const renderNavigationLinks = (
    menuGroup: { items: Array<any> },
    listClassName?: string
  ) =>
    menuGroup?.items && menuGroup?.items?.length > 0
      ? menuGroup.items.map((menuItem: any) => {
          const href = getLinkHrefPrefix(menuItem);
          const linkText = getLinkDisplayText(menuItem);

          return (
            href?.length > 0 &&
            linkText?.length > 0 && (
              <li
                key={menuItem.sys.id}
                className={listClassName}
                {...inspectorMode({
                  entryId: menuItem.sys.id,
                  fieldId: "pageName",
                })}
              >
                <LinkShared href={href}>{linkText}</LinkShared>
              </li>
            )
          );
        })
      : undefined;

  return (
    <>
      {navigationContent?.menuItemsCollection?.items &&
        navigationContent?.menuItemsCollection?.items?.length > 0 && (
          <nav role="navigation" {...rest}>
            <ul className={classes.menu}>
              {navigationContent.menuItemsCollection.items.map(
                (menuItem) =>
                  menuItem &&
                  Object.keys(menuItem)?.length > 0 && (
                    <li
                      key={menuItem.sys.id}
                      className={classes.menuItem}
                      {...inspectorMode({
                        entryId: menuItem.sys.id,
                        fieldId: "groupName",
                      })}
                    >
                      {!menuItem.link &&
                      menuItem.groupName &&
                      menuItem.groupName?.length > 0
                        ? menuItem.groupName
                        : menuItem.link?.slug &&
                          menuItem.link?.slug?.length > 0 && (
                            <LinkShared href={`/${menuItem.link.slug}`}>
                              {menuItem.groupName}
                            </LinkShared>
                          )}

                      {!menuItem.link && menuItem.children && (
                        <ul className={classes.submenu}>
                          {renderNavigationLinks(
                            menuItem.children,
                            classes.submenuItem
                          )}
                        </ul>
                      )}
                    </li>
                  )
              )}
            </ul>
          </nav>
        )}
    </>
  );
};

NavigationCtfComponentFeature.displayName = "NavigationCtfComponentFeature";

export default NavigationCtfComponentFeature;
