import { inputThemeNamespace } from "@xcritical/input";

export const input = {
  [inputThemeNamespace]: {
    backgroundColor: "rgba(0,0,0,0)",
    border: "none",
    borderBottom: "1px solid #ccc",
    borderRadius: "0px",
    input: {
      color: "black",
      fontSize: "16px",
    },
    appearance: {
      default: {
        hover: {
          borderColor: "black",
        },
        focus: {
          borderColor: "black",
        },
        active: {
          borderColor: "black",
        },
      },
    },
  },
};
