import { PreviewArticle } from "./preview-article";

export const metadata = {
  title: "預覽文章",
};

export default function PreviewPage() {
  return (
    <section className="py-8">
      <PreviewArticle />
    </section>
  );
}
