import colorStyles, { ColorProps } from "./colorStyles";
import layoutStyles, { LayoutProps } from "./layoutStyles";

export interface ThemeProps {
  theme: {
    color: ColorProps;
    layout: LayoutProps;
  }
}

export default {
  color: colorStyles,
  layout: layoutStyles
}