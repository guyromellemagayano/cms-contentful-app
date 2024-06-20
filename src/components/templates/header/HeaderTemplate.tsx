import Menu from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Theme,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";

import { NavigationGqlCtfComponentFeature } from "@/components/features/ctf-components/navigation";
import { LinkShared } from "@/components/shared/link";
import { ColorfulCoinLogo } from "@/components/svg/icons";
import {
  THEME_CONTAINER_WIDTH,
  THEME_HEADER_HEIGHT,
  THEME_HEADER_HEIGHT_MD,
} from "@/theme";

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    boxShadow: "0 2px 6px #00000021",
  },
  toolbar: {
    height: THEME_HEADER_HEIGHT_MD,
    [theme.breakpoints.up("md")]: {
      height: THEME_HEADER_HEIGHT,
    },
  },
  toolbarContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
  },
  logo: {
    display: "block",
    maxWidth: "120px",
    height: "auto",
  },
  menuWrapper: {
    alignItems: "center",
    display: "flex",
  },
  accountMenu: {
    alignItems: "center",
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  accountMenuItem: {
    "& + &": {
      marginLeft: theme.spacing(8),

      [theme.breakpoints.up("lg")]: {
        marginLeft: theme.spacing(10),
      },
    },
    "& .MuiButton-startIcon": {
      marginRight: "0.4rem",
    },
    "& .MuiButton-iconSizeSmall > :first-child": {
      fontSize: "1.5rem",
    },
  },
  corporateLogo: {
    display: "block",
    height: "auto",
    width: "113px",
  },
}));

export type HeaderTemplateProps = {
  isMenuOpen?: boolean;
  onMenuClick?: () => any;
};

/**
 * Render the header template component.
 * @param {HeaderTemplateProps} props - The properties to render the component with.
 * @returns The rendered template component.
 */
const HeaderTemplate = (props: HeaderTemplateProps) => {
  const { isMenuOpen, onMenuClick } = props;

  const t = useTranslations();
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="secondary" className={classes.appbar}>
      <Toolbar>
        <Container
          className={classes.toolbarContent}
          disableGutters
          maxWidth={false}
          style={{
            maxWidth: `${THEME_CONTAINER_WIDTH / 10}rem`,
          }}
        >
          <LinkShared href="/" withoutMaterial title={t("Common.homepage")}>
            <ColorfulCoinLogo className={classes.corporateLogo} />
          </LinkShared>
          <Box display={{ xs: "none", md: "block" }}>
            <div className={classes.menuWrapper}>
              <NavigationGqlCtfComponentFeature />
            </div>
          </Box>
        </Container>
        <Box display={{ md: "none" }}>
          <IconButton
            title={t("Navigation.mobileMenuButton")}
            onClick={() => onMenuClick?.()}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
          >
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

HeaderTemplate.displayName = "HeaderTemplate";

export default HeaderTemplate;
