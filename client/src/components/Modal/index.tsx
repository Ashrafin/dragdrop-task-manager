import { ReactElement, ReactNode } from "react";

import {
  ModalContainer,
  ModalWrapper
} from "@/styles/modal.styles";

interface IModal {
  children?: ReactNode | ReactElement;
};

export default function Modal({ children }: IModal) {
  return (
    <ModalContainer>
      <ModalWrapper>
        {children}
      </ModalWrapper>
    </ModalContainer>
  );
};