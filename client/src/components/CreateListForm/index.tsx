import { FormEvent } from "react";

import {
  CreateListButton,
  ListWrapper,
  ListTitleInput,
  AddListButton,
  CloseListButton
} from "@/styles/createListForm.styles";
import { MarginSpacer } from "@/styles/global.styles";
import Close from "../Icons/close";
import Plus from "../Icons/plus";

interface IListFormData {
  isEditingListName: boolean;
  isDraggingList: boolean;
  listName: string;
  modifiedListName: string;
  activeListId: string;
  draggingListId: string;
  draggingListIndex: number;
};

interface ICreateListFormProps {
  showCreateListForm: boolean;
  listFormData: IListFormData;
  setShowCreateListForm: (value: boolean) => void;
  setListFormData: (listFormData: IListFormData) => void;
  handleChangeListName: (event: FormEvent<HTMLInputElement>) => void;
  handleCreateNewList: () => void;
};

export default function CreateListForm({
  showCreateListForm,
  listFormData,
  setShowCreateListForm,
  setListFormData,
  handleChangeListName,
  handleCreateNewList
}: ICreateListFormProps) {
  return (
    <>
      {!showCreateListForm ? (
        <CreateListButton onClick={() => setShowCreateListForm(true)}>
          <Plus size="16" />
          Add another list
        </CreateListButton>
      ) : (
        <ListWrapper>
          <ListTitleInput
            id="listNameInput"
            name="listNameInput"
            value={listFormData.listName}
            onChange={handleChangeListName}
            placeholder="Enter a list name..."
            autoFocus
            required
          />
          <MarginSpacer $amount={0.5} />
          <div style={{ display: "flex" }}>
            <AddListButton onClick={handleCreateNewList} disabled={listFormData.listName.length <= 3}>
              Add list
            </AddListButton>
            <CloseListButton
              onClick={() => {
                setShowCreateListForm(false);
                setListFormData({
                  ...listFormData,
                  listName: ""
                });
              }}
            >
              <Close size="20" color="#000" />
            </CloseListButton>
          </div>
        </ListWrapper>
      )}
    </>
  );
};