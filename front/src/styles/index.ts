import colorStyles, { ColorProps } from "./colorStyles";

export interface ThemeProps {
  theme: {
    color: ColorProps;
  }
}

export default {
  color: colorStyles
}