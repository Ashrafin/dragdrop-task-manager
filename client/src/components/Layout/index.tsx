import { ReactElement, ReactNode } from "react";

import SEO from "../SEO";

interface ILayout {
  children?: ReactNode | ReactElement
};

export default function Layout({ children }: ILayout) {
  return (
    <>
      <SEO pageTitle="Next Scrum Board" pageDescription="Welcome to the nextjs scrum board" />
      {children}
    </>
  );
};