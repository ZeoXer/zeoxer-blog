const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg leading-7 mb-2 text-default-700">{children}</p>
);

export const Readme = () => {
  return (
    <article>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-6">關於本站</h2>
        <Paragraph>
          大家好，這裡是我的個人部落格，主要用來分享、記錄我在摸索程式設計和技術相關的學習經驗和筆記。
        </Paragraph>
        <Paragraph>
          這個部落格本身也是當初作為練習的一個 side
          project，在開發的過程中一路從前端、後端到部署，以及把各種我想要的功能加進來，還有後續的效能優化、SEO
          等等，都讓我對於程式開發有了更深的理解和體會，目前也變成我個人的筆記本。
        </Paragraph>
        <Paragraph>
          希望這個部落格能夠成為一個有用的資源，幫助和我一樣在探索學習的朋友們少走一些彎路。最後由於個人的知識、理解有其侷限，如果你對於文章內容發現任何問題或有其它建議、想法，都歡迎隨時聯絡我！
        </Paragraph>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">關於作者</h3>
        <Paragraph>
          讀者可以從右上角「個人檔案」的連結進入查看關於我的更多資訊，也可以找到關於我的相關聯絡方式。
        </Paragraph>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">系列文章</h3>
        <Paragraph>
          這個部落格當初設計的時候用了類似資料夾的方式歸納文章，方便讀者可以從側邊的目錄快速找到相關主題的文章。另外也可以運用右側的搜尋功能
          (行動裝置沒有放進來) 來搜尋文章標題和內容。
        </Paragraph>
      </div>
    </article>
  );
};
