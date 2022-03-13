import colorStyles, { ColorProps } from "./colorStyles";
import layoutStyles, { LayoutProps } from "./layoutStyles";
import '@emotion/react'

declare module '@emotion/react' {
  interface Theme {
    color: ColorProps;
    layout: LayoutProps;
  }
}

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