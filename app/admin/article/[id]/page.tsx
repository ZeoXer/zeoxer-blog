"use client";

import {
  addArticle,
  getAllArticleCategory,
  getArticle,
  updateArticle,
} from "@/data/article";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { vscodeLight, vscodeDark } from "@uiw/codemirror-theme-vscode";
import MarkdownDisplay from "@/components/markdown-display";
import { useTheme } from "next-themes";
import { Card } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  CodeIcon,
  EyeIcon,
  FolderIcon,
  H1Icon,
  SaveIcon,
} from "@/components/icons";
import { Button } from "@heroui/button";
import { TCategory } from "@/types/article";
import { addToast } from "@heroui/toast";
import { readDraft, saveDraft, deleteDraft, TDraft } from "./use-draft";
import { Chip } from "@heroui/chip";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";

interface TAriticleDraft {
  title: string;
  content: string;
}

export default function ArticlePage() {
  const id = +(useParams().id || 0);
  const draftKey = id === 0 ? "new-article-draft" : `article-draft-${id}`;
  const [draft, setDraft] = useState<TDraft<TAriticleDraft> | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [categoryId, setCategoryId] = useState(new Set<string>([]));
  const [categories, setCategories] = useState<TCategory[]>([]);
  const { isOpen, onOpenChange } = useDisclosure();
  const { theme } = useTheme();
  const currentDataRef = useRef<TAriticleDraft>({ title, content });
  const draftRef = useRef<TAriticleDraft | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id !== 0) {
      fetchArticle(id);
    }
    fetchArticleCategories();
    handleDraftLoad();
  }, [id]);

  useEffect(() => {
    currentDataRef.current = { title, content };
  }, [title, content]);

  useEffect(() => {
    draftRef.current = draft && draft?.data;
  }, [draft]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (draftRef.current === currentDataRef.current) return;
      saveDraft(draftKey, currentDataRef.current);
      setDraft({ data: currentDataRef.current, updatedAt: Date.now() });
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [draftKey]);

  const handleDraftLoad = async () => {
    const draft = await readDraft<TAriticleDraft>(draftKey);
    if (draft) {
      setDraft(draft);
      onOpenChange();
    }
  };

  const coverDraft = () => {
    if (!draft) return;
    setTitle(draft.data.title);
    setContent(draft.data.content);
    onOpenChange();
  };

  const fetchArticle = async (articleId: number) => {
    try {
      const { data } = await getArticle(articleId);
      setTitle(data.title);
      setContent(data.content);
      setCategoryId(new Set([String(data.category_id)]));
      setIsPublished(data.is_published);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const fetchArticleCategories = async () => {
    try {
      const { data } = await getAllArticleCategory();
      const formattedCategories = data.map((category) => ({
        id: category.id,
        name: category.category_name,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching article categories:", error);
    }
  };

  const checkArticleDataValid = () => {
    return title.trim() !== "" && content.trim() !== "" && categoryId.size > 0;
  };

  const handleSelectionChange = (keys: any) => {
    if (keys === "all") return;

    if (keys instanceof Set) {
      const strs = Array.from(keys).map((k) => String(k));
      setCategoryId(new Set(strs));
      return;
    }

    setCategoryId(new Set([String(keys)]));
  };

  const handleArticleSave = async () => {
    if (!checkArticleDataValid()) return;

    const responseAction = (status: number, type: "add" | "update") => {
      if (status === 1) {
        router.replace("/admin/article");
        deleteDraft(draftKey);
        addToast({
          title: `文章${type === "add" ? "建立" : "更新"}成功`,
          description: title,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
      } else {
        addToast({
          title: `文章${type === "add" ? "建立" : "更新"}失敗`,
          description: title,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "danger",
        });
      }
    };

    if (id === 0) {
      try {
        const { status } = await addArticle(
          title.trim(),
          content.trim(),
          Number(Array.from(categoryId)[0])
        );
        responseAction(status, "add");
      } catch (error) {
        console.error("Error saving article:", error);
      }
    } else {
      try {
        const { status } = await updateArticle(
          id,
          title.trim(),
          content.trim(),
          isPublished,
          Number(Array.from(categoryId)[0])
        );
        responseAction(status, "update");
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
  };

  const editorTheme = theme === "dark" ? vscodeDark : vscodeLight;

  return (
    <section>
      <header className="flex items-center mb-4 gap-4">
        <Input
          value={title}
          onValueChange={setTitle}
          variant="underlined"
          startContent={
            <H1Icon className="w-6 h-6 shrink-0 text-default-500" />
          }
          classNames={{ input: "text-lg" }}
        />
        <Dropdown backdrop="opaque" placement="bottom-end">
          <DropdownTrigger>
            <Button
              variant="bordered"
              size="lg"
              startContent={<FolderIcon className="w-4 h-4 shrink-0" />}
            >
              <span className="text-md">
                {categories.find(
                  (cat) => cat.id.toString() === Array.from(categoryId)[0]
                )?.name || "選擇分類"}
              </span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="bordered"
            disallowEmptySelection
            selectionMode="single"
            items={categories}
            selectedKeys={categoryId}
            onSelectionChange={handleSelectionChange}
            className="p-2"
            itemClasses={{
              title: "text-md",
            }}
          >
            {(item) => (
              <DropdownItem key={item.id} value={item.id} title={item.name} />
            )}
          </DropdownMenu>
        </Dropdown>
        <Button
          color="warning"
          variant="shadow"
          size="lg"
          isDisabled={!checkArticleDataValid()}
          startContent={<SaveIcon className="w-5 h-5 shrink-0" />}
          onPress={handleArticleSave}
        >
          儲存
        </Button>
      </header>
      <article>
        <Tabs variant="light" color="warning">
          <Tab key="editor" title={<CodeIcon className="w-6" />}>
            <Card>
              <CodeMirror
                value={content}
                theme={editorTheme}
                className="min-h-[300px] max-h-[650px] overflow-y-auto"
                extensions={[
                  markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                  }),
                ]}
                onChange={setContent}
              />
            </Card>
          </Tab>
          <Tab key="preview" title={<EyeIcon className="w-6" />}>
            <Card className="px-6 py-2 min-h-[300px] max-h-[650px] overflow-auto">
              <MarkdownDisplay content={content} />
            </Card>
          </Tab>
        </Tabs>
      </article>
      <div className="flex justify-end">
        {draft?.updatedAt && (
          <Chip color="warning" variant="dot" className="animate-appearance-in">
            草稿已儲存：
            {new Date(draft.updatedAt).toLocaleTimeString("en-US", {
              timeZone: "Asia/Taipei",
            })}
          </Chip>
        )}
      </div>
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
    </section>
  );
}
