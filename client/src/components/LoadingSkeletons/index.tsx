import { ReactElement, ReactNode } from "react";

interface ILoadingSkeletonsProps {
  children?: ReactNode | ReactElement;
};

export default function LoadingSkeletons({ children }: ILoadingSkeletonsProps) {
  return (
    <>
      {children}
    </>
  );
};