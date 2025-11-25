export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ZeoXer's Blog",
  description: "楊佳勳的個人部落格，主要分享一些技術筆記和學習紀錄",
  about: `
  我是楊佳勳，在轉往資訊科學領域的過程中累積了許多實作和研究經驗，除了透過實習和遠端工作機會以應用自身所學和能力於實際場合中，
  從前端基礎 HTML/CSS/JS 以及 React/Next.js 等框架，到利用 Golang、Google Apps Script 維護後端、資料庫等皆有相關經驗；
  亦利用在學和空餘時間研究其餘領域的技術，包含自行架設部落格網站、研究簡易 RAG、AI Agent 等系統。
  在現今 AI 發展迅速的時代，也將持續精進相關知識和技能以期在變動頻繁的環境裡具備快速適應的能力。
  `,
  skills: {
    backend: [
      { name: "Python", level: 92 },
      { name: "Golang", level: 81 },
      { name: "Node.js", level: 84 },
      { name: "MySQL", level: 78 },
    ],
    frontend: [
      { name: "HTML/CSS/JS", level: 94 },
      { name: "TypeScript", level: 88 },
      { name: "React/Next.js", level: 91 },
      { name: "TailwindCSS", level: 82 },
    ],
    tool: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 85 },
      { name: "Vite", level: 81 },
    ],
    service: [
      { name: "AWS EC2", level: 76 },
      { name: "Zeabur", level: 77 },
      { name: "Cloudflare R2", level: 75 },
    ],
  },
  workExperience: [
    {
      company: "六角學院",
      role: "課程助教",
      startYear: "2020",
      endYear: "",
      description: `
      擔任課程助教至今主要工作內容為協助課程問題檢視和回覆，範圍包含 HTML/CSS/JS 和 jQuery、Bootstrap5、React 等延伸套件框架，強化問題分析、解決能力。
      同時亦運用平台資源持續進修相關技術如 Vue.js、TypeScript 等。
      `,
      logo: "https://pub-730d41d50aa14413843d2f22e88310a6.r2.dev/uploads/2025/10/27/hexschool.png",
    },
    {
      company: "mrhost",
      role: "資訊部實習生",
      startYear: "2022",
      endYear: "2024",
      description: `
      在公司實習期間內應用了諸多技術於實務方面，包括使用 Python 撰寫網路爬蟲進行資料蒐集、以 Google Apps Script 進行試算表和外部資料的整合、
      運用 Golang 維護後端 API 完成資料串接需求，以及透過 Next.js 框架配合 UI 設計師架設對 B 端的後臺管理系統。
      `,
      logo: "https://pub-730d41d50aa14413843d2f22e88310a6.r2.dev/uploads/2025/10/27/mrhost.png",
    },
  ],
  education: [
    {
      school: "國立政治大學 資訊科學系",
      degree: "碩士",
      field: "資訊工程",
      startYear: "2023",
      endYear: "2025",
      description: `
      
      `,
      logo: "https://pub-730d41d50aa14413843d2f22e88310a6.r2.dev/uploads/2025/10/27/nccu.png",
    },
    {
      school: "國立臺灣大學 材料科學與工程學系",
      degree: "學士",
      startYear: "2018",
      endYear: "2023",
      description: `
     
      `,
      logo: "https://pub-730d41d50aa14413843d2f22e88310a6.r2.dev/uploads/2025/10/27/ntu.png",
    },
  ],
};
