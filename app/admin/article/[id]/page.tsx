"use client";

import {
  addArticle,
  getAllArticleCategory,
  updateArticle,
} from "@/data/article";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@heroui/input";
import MarkdownDisplay from "@/components/markdown-display";
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
import { TArticle, TCategory } from "@/types/article";
import { addToast } from "@heroui/toast";
import { readDraft, saveDraft, deleteDraft, TDraft } from "./use-draft";
import { Chip } from "@heroui/chip";
import { useDisclosure } from "@heroui/modal";
import { useLoading } from "@/app/use-loading";
import { CodeEditor } from "@/components/code-editor";
import AdminArticleDraftModal from "./draft-modal";

interface TAriticleDraft {
  title: string;
  content: string;
}

export default function AdminArticleEditPage({
  article,
}: {
  article: TArticle;
}) {
  const id = +(useParams().id || 0);
  const defaultCategoryId =
    useSearchParams().get("category") || article.categoryId.toString();
  const draftKey = id === 0 ? "new-article-draft" : `article-draft-${id}`;
  const [draft, setDraft] = useState<TDraft<TAriticleDraft> | null>(null);
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [categoryId, setCategoryId] = useState(
    new Set<string>([defaultCategoryId])
  );
  const [categories, setCategories] = useState<TCategory[]>([]);
  const { isOpen, onOpenChange } = useDisclosure();
  const { setIsLoading } = useLoading();
  const currentDataRef = useRef<TAriticleDraft>({ title, content });
  const draftRef = useRef<TAriticleDraft | null>(null);
  const router = useRouter();

  useEffect(() => {
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
    }, 5000);

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
    setIsLoading(true);

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

    try {
      if (id === 0) {
        const { status } = await addArticle(
          title.trim(),
          content.trim(),
          Number(Array.from(categoryId)[0])
        );
        responseAction(status, "add");
      } else {
        const { status } = await updateArticle(
          id,
          title.trim(),
          content.trim(),
          !!article.isPublished,
          Number(Array.from(categoryId)[0])
        );
        responseAction(status, "update");
      }
    } catch (error) {
      responseAction(0, id === 0 ? "add" : "update");
    } finally {
      setIsLoading(false);
    }
  };

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
        <Tabs variant="light" color="warning" destroyInactiveTabPanel={false}>
          <Tab key="editor" title={<CodeIcon className="w-6" />}>
            <Card>
              <CodeEditor content={content} setContent={setContent} />
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
      <AdminArticleDraftModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        draft={draft}
        coverDraft={coverDraft}
      />
    </section>
  );
}
