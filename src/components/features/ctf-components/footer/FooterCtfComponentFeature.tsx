"use client";

import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Container, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";

import { LanguageSelectorFeature } from "@/components/features/language-selector";
import { LinkShared } from "@/components/shared/link";
import { LogoTagline } from "@/components/svg/icons";
import { useContentfulContext } from "@/hooks/contentful";
import { getLinkDisplayText, getLinkHrefPrefix } from "@/libs/utils";
import { THEME_CONTAINER_WIDTH } from "@/theme";
import type { WithAny } from "@/types/common";

import type { FooterFieldsFragment } from "./__generated/footer-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  footerContainer: {
    backgroundColor: "#F4F4F4",
  },
  footer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    maxWidth: `${THEME_CONTAINER_WIDTH / 10}rem`,
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(10),
      paddingTop: theme.spacing(20),
    },
  },
  menuWrapper: {
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-8),
  },
  menuColumn: {
    paddingLeft: theme.spacing(8),
  },
  menu: {
    listStyle: "none",
    margin: theme.spacing(0, 0, 8),
    padding: 0,
    width: "17.2rem",
    [theme.breakpoints.up("md")]: {
      marginBottom: 0,
    },
  },
  menuItem: {
    fontSize: "1.8rem",
    fontWeight: 400,
    lineHeight: 1.2,
    color: "#1B273A",
    margin: theme.spacing(0, 0, 4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(8),
    },
  },
  submenu: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    "& $menuItem": {
      fontWeight: 400,
    },
  },
  submenuItem: {
    "& a": {
      borderBottom: "1px solid transparent",
      color: "#414D63",
      display: "inline-block",
      minWidth: 0,
      transition: "border-bottom-color 0.2s ease-in-out",
    },

    "&:hover, &:focus, &:focus-within": {
      "& > a": {
        borderBottomColor: "#7C7C7C",
      },
    },
  },
  footerEndSection: {
    marginLeft: "auto",
  },
  footerCorporateContainer: {
    backgroundColor: "#212121",
    color: "#fff",
    paddingBottom: theme.spacing(14),
    paddingTop: theme.spacing(8),
  },
  footerCorporate: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: `${THEME_CONTAINER_WIDTH / 10}rem`,
  },
  storeLogos: {
    marginTop: theme.spacing(7),
  },
  storeLogo: {
    display: "block",
    maxWidth: "11.5rem",
    "& + &": {
      marginTop: theme.spacing(5),
    },
    "& img": {
      display: "block",
      maxWidth: "100%",
    },
  },
  corporateLogoMenu: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  corporateLogoContainer: {
    flexShrink: 0,
    marginBottom: theme.spacing(3),
    marginTop: "0.2rem",
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
      width: "38.4rem",
    },
  },
  corporateLogo: {
    display: "block",
    height: "auto",
    maxWidth: "100%",
  },
  copyrightAndLegal: {
    [theme.breakpoints.up("md")]: {
      alignItems: "flex-start",
      display: "flex",
    },
  },
  copyright: {
    fontSize: "1.8rem",
    lineHeight: 1.2,
    margin: theme.spacing(1, 10, 0, 0),
  },
  legalMenuWrapper: {},
  legalMenu: {
    listStyle: "none",
    margin: theme.spacing(5, 0, 0),
    padding: 0,
    [theme.breakpoints.up("md")]: {
      alignItems: "flex-start",
      display: "flex",
      flexWrap: "wrap",
      marginTop: 0,
    },
  },
  legalMenuItem: {
    fontSize: "2rem",
    marginTop: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
      width: "auto",
    },
    "&:not(:last-child)": {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(8),
      },
    },
    "& a": {
      borderBottom: "1px solid transparent",
      color: "#fff",
      display: "inline-block",
      transition: "border-bottom-color 0.2s ease-in-out",
    },

    "&:hover, &:focus, &:focus-within": {
      "& > a": {
        borderBottomColor: "#000",
      },
    },
  },
  socialDisclaimer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      marginTop: theme.spacing(7),
    },
  },
  socialWrapper: {
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
      order: -1,
      marginRight: theme.spacing(8),
      width: "38.4rem",
    },
  },
  socialTitle: {
    fontSize: "1.8rem",
    fontWeight: 400,
    lineHeight: 1.2,
  },
  social: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(6),
    "& a": {
      color: "inherit",
      display: "inline-block",
      lineHeight: 1.2,

      "&:not(:first-child)": {
        marginLeft: theme.spacing(6),
      },
    },
    "& .MuiSvgIcon-root": {
      fontSize: "3.2rem",
    },
  },
}));

export type FooterCtfComponentFeatureProps = WithAny & FooterFieldsFragment;

/**
 * Renders the footer `contentful` feature component.
 * @param {FooterCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const FooterCtfComponentFeature = (props: FooterCtfComponentFeatureProps) => {
  const { items, ...rest } = props;

  const footerContent = items?.[0] || undefined;

  const t = useTranslations();
  const { locale } = useContentfulContext();
  const inspectorMode = useContentfulInspectorMode();
  const classes = useStyles();

  // Renders the menu group links.
  const renderMenuGroupLinks = (
    menuGroup: { items: Array<any> },
    listClassName?: string
  ) =>
    menuGroup?.items?.length > 0
      ? menuGroup.items.map((menuItem: any) => {
          const href = getLinkHrefPrefix(menuItem),
            linkText = getLinkDisplayText(menuItem);

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
                <LinkShared href={href} className={classes.menuItem}>
                  {linkText}
                </LinkShared>
              </li>
            )
          );
        })
      : undefined;

  // Retrieves the container props for the footer component based on the footer content.
  // If the footer content exists, it calls the `inspectorMode` function to get the container props.
  // Otherwise, it returns undefined.
  const containerProps =
    footerContent?.sys?.id && footerContent?.sys?.id?.length > 0
      ? inspectorMode({
          entryId: footerContent.sys.id,
          fieldId: "menuItems",
          locale,
        })
      : undefined;

  return (
    <>
      <Container
        maxWidth={false}
        className={classes.footerContainer}
        {...containerProps}
        {...rest}
      >
        {footerContent?.menuItemsCollection?.items &&
          footerContent?.menuItemsCollection?.items?.length > 0 && (
            <footer className={classes.footer}>
              <nav role="navigation" className={classes.menuWrapper}>
                {footerContent.menuItemsCollection.items.map(
                  (menuItem) =>
                    menuItem && (
                      <div key={menuItem.sys.id} className={classes.menuColumn}>
                        <ul className={classes.menu}>
                          <li>
                            {menuItem.groupName &&
                              menuItem.groupName?.length > 0 && (
                                <p
                                  className={classes.menuItem}
                                  {...inspectorMode({
                                    entryId: menuItem.sys.id,
                                    fieldId: "groupName",
                                    locale,
                                  })}
                                >
                                  {menuItem.groupName}
                                </p>
                              )}

                            {menuItem.featuredPagesCollection && (
                              <ul className={classes.submenu}>
                                {renderMenuGroupLinks(
                                  menuItem.featuredPagesCollection,
                                  classes.submenuItem
                                )}
                              </ul>
                            )}
                          </li>
                        </ul>
                      </div>
                    )
                )}
              </nav>
              <section className={classes.footerEndSection}>
                <LanguageSelectorFeature />
              </section>
            </footer>
          )}
      </Container>
      <Container maxWidth={false} className={classes.footerCorporateContainer}>
        <section className={classes.footerCorporate}>
          <div className={classes.corporateLogoMenu}>
            <div className={classes.corporateLogoContainer}>
              <LogoTagline className={classes.corporateLogo} />
            </div>
            <section className={classes.copyrightAndLegal}>
              <p className={classes.copyright}>
                {t("legal.copyright", { year: new Date().getFullYear() })}
              </p>

              {footerContent?.legalLinks?.featuredPagesCollection?.items &&
                footerContent?.legalLinks?.featuredPagesCollection?.items
                  ?.length > 0 && (
                  <nav role="navigation" className={classes.legalMenuWrapper}>
                    <ul className={classes.legalMenu}>
                      {renderMenuGroupLinks(
                        footerContent.legalLinks.featuredPagesCollection,
                        classes.legalMenuItem
                      )}
                    </ul>
                  </nav>
                )}
            </section>
          </div>

          <div className={classes.socialDisclaimer}>
            <div className={classes.socialWrapper}>
              <Typography className={classes.socialTitle}>
                {t("socials.findUsOn")}
              </Typography>
              <div className={classes.social}>
                {footerContent?.twitterLink &&
                  footerContent?.twitterLink?.length > 0 && (
                    <a
                      href={footerContent.twitterLink}
                      title={t("socials.twitter")}
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      <Twitter />
                    </a>
                  )}

                {footerContent?.facebookLink &&
                  footerContent?.facebookLink?.length > 0 && (
                    <a
                      href={footerContent.facebookLink}
                      title={t("socials.facebook")}
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      <Facebook />
                    </a>
                  )}

                {footerContent?.linkedinLink &&
                  footerContent?.linkedinLink?.length > 0 && (
                    <a
                      href={footerContent.linkedinLink}
                      title={t("socials.linkedin")}
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      <LinkedIn />
                    </a>
                  )}

                {footerContent?.instagramLink &&
                  footerContent?.instagramLink?.length > 0 && (
                    <a
                      href={footerContent.instagramLink}
                      title={t("socials.instagram")}
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      <Instagram />
                    </a>
                  )}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

FooterCtfComponentFeature.displayName = "FooterCtfComponentFeature";

export default FooterCtfComponentFeature;
