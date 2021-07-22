export interface LayoutProps {
  header: {
    default: string;
    tablet: string;
    mobile: string;
  }
}

export default {
  header: {
    default: "50px",
    tablet: "60px",
    mobile: "40px",
  }
} as LayoutProps