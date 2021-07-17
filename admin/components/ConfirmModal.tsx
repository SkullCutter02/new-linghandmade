import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface Props {
  target: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  cancelBtnRef: MutableRefObject<HTMLButtonElement>;
  actionFn: any;
  isLoading: boolean;
}

const ConfirmModal: React.FC<Props> = ({
  target,
  isModalOpen,
  setIsModalOpen,
  cancelBtnRef,
  actionFn,
  isLoading,
}) => {
  const onClose = () => setIsModalOpen(false);

  return (
    <>
      <AlertDialog isOpen={isModalOpen} leastDestructiveRef={cancelBtnRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {target}
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelBtnRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={actionFn} isLoading={isLoading} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmModal;
