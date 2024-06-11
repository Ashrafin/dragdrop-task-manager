import { FormEvent, useRef } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { closeModal } from "@/store/feature/modalSlice";

import {
  ModalCloseButton,
  ModalHeader,
  ModalListItem,
  ModalTitle
} from "@/styles/modal.styles";
import Close from "../Icons/close";
import { MarginSpacer } from "@/styles/global.styles";

interface IListDetailsModalProps {
  list: TList;
  listFormData: TListFormData;
  setListFormData: (listFormData: TListFormData) => void;
  handleModifiedListName: (event: FormEvent<HTMLHeadingElement>) => void;
  handleUpdateListName: (updatedListName: string) => void;
  handleDeleteList: () => void;
};

export default function ListDetailsModal({
  list,
  listFormData,
  setListFormData,
  handleModifiedListName,
  handleUpdateListName,
  handleDeleteList
}: IListDetailsModalProps) {
  const dispatch = useAppDispatch();
  const editableListNameRef = useRef<HTMLHeadingElement | null>(null);
  
  return (
    <>
      <ModalHeader>
        <ModalTitle
          contentEditable
          suppressContentEditableWarning
          ref={editableListNameRef}
          onClick={() => {
            editableListNameRef?.current?.classList.add("editing-title");
            editableListNameRef.current?.focus();
            setListFormData({
              ...listFormData,
              isEditingListName: true,
              modifiedListName: list.name
            });
          }}
          onInput={handleModifiedListName}
          onBlur={() => {
            editableListNameRef?.current?.blur();
            editableListNameRef?.current?.classList.remove("editing-title");
            setListFormData({
              ...listFormData,
              modifiedListName: listFormData.modifiedListName
            });
          }}
          className="editable-title"
        >
          {list.name}
        </ModalTitle>
        <ModalCloseButton onClick={() => {
            dispatch(closeModal());
            handleUpdateListName(list.name);
            setListFormData({
              ...listFormData,
              isEditingListName: false,
              activeListId: "",
              modifiedListName: ""
            });
          }}
        >
          <Close size="18" />
        </ModalCloseButton>
      </ModalHeader>
      <MarginSpacer $amount={1} />
      <ModalListItem
        onClick={() => {
          setListFormData({
            ...listFormData,
            activeListId: list.id
          });
          dispatch(closeModal());
        }}
      >
        Add a card
      </ModalListItem>
      <MarginSpacer $amount={0.75} />
      <ModalListItem onClick={handleDeleteList}>
        Delete this list
      </ModalListItem>
    </>
  );
};