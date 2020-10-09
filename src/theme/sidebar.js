import { sidebarThemeNamespace } from "@xcritical/sidebar";
import * as colors from "./colors";

export const sidebarTheme = {
  [sidebarThemeNamespace]: {
    rootContainer: {
      zIndex: 1000,
      height: "100%",
      minHeight: "100vh",
    },
    sidebarContainer: {
      display: "flex",
      flexFlow: "row nowrap",
      color: colors.BLACK,
      height: "100vh",
      position: "fixed",
      zIndex: 100,
      transition: ".5s",
      padding: 0,
    },
    navContainer: {
      background: colors.BACKGROUND_GRADIENT,
      height: "calc(100vh + 10px)",
    },
    responsiveContainer: {
      minHeight: "100vh",
      display: "flex",
      flexWrap: "nowrap",
      color: colors.BLACK,
      transition: ".5s",
    },
    childContainer: {
      background: colors.BACKGROUND_GRADIENT,
      overflowY: "auto",
      overflowX: "hidden",
      color: colors.BLACK,
      transition: ".5s",
    },
    separatorContainer: {
      height: "100vh",
      cursor: "w-resize",
      zIndex: 999999,
    },
    separator: {
      color: colors.BLACK,
      width: "1px",
      height: "100%",
      background: "rgba(0,0,0,0)",
    },
    closeOpenButton: {
      width: "20px",
      height: "20px",
      position: "relative",
      top: "10%",
      color: "black",
      borderRadius: "50%",
      // border: "1px solid gray",
      padding: "3px",
      background: colors.BACKGROUND_GRADIENT,
      transition: ".5s",
      transitionTimingFunction: "linear",
      cursor: "pointer",
    },
  },
};
