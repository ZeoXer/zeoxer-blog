"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { TDraft } from "./use-draft";

interface TArticleDraft {
  title: string;
  content: string;
}

interface AdminArticleDraftModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  draft: TDraft<TArticleDraft> | null;
  coverDraft: () => void;
}

export default function AdminArticleDraftModal({
  isOpen,
  onOpenChange,
  draft,
  coverDraft,
}: AdminArticleDraftModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop="blur"
    >
      <ModalContent className="p-2">
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-lg font-semibold">偵測到未存檔草稿</h2>
            </ModalHeader>
            <ModalBody>
              <p>
                偵測到草稿儲存於
                <span className="ml-1 font-semibold">
                  {draft
                    ? new Date(draft.updatedAt).toLocaleTimeString("en-US", {
                        timeZone: "Asia/Taipei",
                      })
                    : "未知時間"}
                </span>
                ，是否將草稿覆蓋當前文章內容？
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} variant="light">
                關閉
              </Button>
              <Button onPress={coverDraft} color="warning">
                確認覆蓋
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
