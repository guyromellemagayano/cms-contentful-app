import type { WithAny } from "@/types/common";
import { Drawer, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import type { NavigationFieldsFragment } from "@/components/features/ctf-components/navigation";
import { LinkShared } from "@/components/shared/link";
import { getLinkDisplayText, getLinkHrefPrefix } from "@/libs/utils";

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    listStyle: "none",
    margin: 0,
    padding: theme.spacing(4, 8),
  },
  menuItem: {
    cursor: "default",
    display: "block",
    fontSize: "2.1rem",
    lineHeight: "1.8",
    position: "relative",

    a: {
      cursor: "pointer",
    },
  },
  submenu: {
    borderLeft: "1px solid #eee",
    listStyle: "none",
    padding: theme.spacing(0, 0, 0, 2),
  },
}));

export type MobileMenuCtfComponentFeatureProps = WithAny &
  NavigationFieldsFragment & {
    isOpen?: boolean;
    onOpenChange: (isOpen: boolean) => any;
  };

/**
 * Renders the mobile menu `contentful` feature component.
 * @param {MobileMenuCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const MobileMenuCtfComponentFeature = (
  props: MobileMenuCtfComponentFeatureProps
) => {
  const { isOpen, onOpenChange, items, ...rest } = props;

  const mobileMenuContent = items?.[0] || null;

  const classes = useStyles();

  // Handles the click event when the close button is clicked.
  const onCloseClick = (e: any, reason: string): void => {
    if (reason === "backdropClick") {
      onOpenChange(false);
    }

    return;
  };

  // Renders the mobile menu links for a given menu group.
  const renderMobileMenuLinks = (menuGroup: { items: any[] }) => {
    return (
      menuGroup?.items &&
      menuGroup?.items?.length > 0 &&
      menuGroup.items.map((menuItem: { sys: { id: string } }) => {
        const href = getLinkHrefPrefix(menuItem);
        const linkText = getLinkDisplayText(menuItem);

        return (
          href?.length > 0 &&
          linkText?.length > 0 && (
            <li key={menuItem.sys.id}>
              <LinkShared href={href} className={classes.menuItem}>
                {linkText}
              </LinkShared>
            </li>
          )
        );
      })
    );
  };

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      onClose={onCloseClick}
      role="dialog"
      id="mobile-menu"
      aria-modal={true}
      {...rest}
    >
      {mobileMenuContent?.menuItemsCollection?.items &&
        mobileMenuContent?.menuItemsCollection?.items?.length > 0 && (
          <nav role="navigation">
            <ul className={classes.menu}>
              {mobileMenuContent.menuItemsCollection.items.map(
                (menuItem) =>
                  menuItem &&
                  Object.keys(menuItem)?.length > 0 && (
                    <li key={menuItem.sys.id} className={classes.menuItem}>
                      {!menuItem.link ? (
                        menuItem.groupName
                      ) : menuItem.link.slug &&
                        menuItem.link.slug?.length > 0 &&
                        menuItem.groupName &&
                        menuItem.groupName?.length > 0 ? (
                        <LinkShared href={`/${menuItem.link.slug}`}>
                          {menuItem.groupName}
                        </LinkShared>
                      ) : undefined}

                      {!menuItem.link &&
                        menuItem.children &&
                        Object.keys(menuItem.children)?.length > 0 && (
                          <ul className={classes.submenu}>
                            {renderMobileMenuLinks(menuItem.children)}
                          </ul>
                        )}
                    </li>
                  )
              )}
            </ul>
          </nav>
        )}
    </Drawer>
  );
};

MobileMenuCtfComponentFeature.displayName = "MobileMenuCtfComponentFeature";

export default MobileMenuCtfComponentFeature;
