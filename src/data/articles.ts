export type WritingTopic =
  | "Data Engineering"
  | "Agentic AI"
  | "Software Engineering"
  | "Books"
  | "Travel"
  | "Films";

export interface Article {
  title: string;
  topic: WritingTopic;
  summary: string;
  publishedAt?: string;
  readingTime?: string;
  url?: string;
}

export const articles: Article[] = [
  {
    title: "Agentic AI ပုံပြင် (၁) — Awakening Talos",
    topic: "Agentic AI",
    summary:
      "The opening chapter of a Burmese-language learning series exploring Agentic AI through the awakening of Talos.",
    publishedAt: "2 August 2026",
    url: "https://medium.com/@mayzinmg/agentic-ai-ပုံပြင်-၁-awakening-talos-74bc9e1262d3",
  },
  {
    title: "The Risk Management Lesson from Scylla and Charybdis",
    topic: "Software Engineering",
    summary:
      "A journey through Greek mythology that connects difficult choices with risk identification, mitigation, avoidance and responsible leadership.",
    publishedAt: "22 July 2026",
    readingTime: "5 min read",
    url: "https://medium.com/@mayzinmg/the-risk-management-lesson-from-scylla-and-charybdis-a2da755d513e",
  },
  {
    title:
      "Designing a Traceable Email Scheduler with Hangfire, Blob Logs, and Local AI Experiment",
    topic: "Software Engineering",
    summary:
      "A practical system-design study covering background processing, operational summaries, JSONL logs, observability and AI-assisted log analysis.",
    publishedAt: "28 May 2026",
    readingTime: "4 min read",
    url: "https://medium.com/@mayzinmg/designing-a-traceable-email-scheduler-with-hangfire-blob-logs-and-local-ai-experiment-b33d685b3de3",
  },
  {
    title:
      "Automating Daily Sales Reports with Azure Logic Apps and SQL Server",
    topic: "Data Engineering",
    summary:
      "A practical automation workflow for scheduling, querying SQL Server, producing an Excel-compatible report and delivering it by email.",
    publishedAt: "12 May 2026",
    readingTime: "3 min read",
    url: "https://medium.com/@mayzinmg/automating-daily-sales-reports-with-azure-logic-apps-and-sql-server-1a0498da905f",
  },
];