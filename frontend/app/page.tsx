"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { ParaphraseTool } from "@/components/tools/paraphrase-tool";
import { GrammarTool } from "@/components/tools/grammar-tool";
import { TranslateTool } from "@/components/tools/translate-tool";
import { SynonymTool } from "@/components/tools/synonym-tool";
import { SummarizerTool } from "@/components/tools/summarizer-tool";
import { ExtenderTool } from "@/components/tools/extender-tool";
import { HistoryTool } from "@/components/tools/history-tool";
import { PremiumTool } from "@/components/tools/premium-tool";
import { AiDetectorTool } from "@/components/tools/ai-detector-tool";
import { PlagiarismCheckerTool } from "@/components/tools/plagiarism-checker-tool";
import { AiHumanizerTool } from "@/components/tools/ai-humanizer-tool";
import { AiChatTool } from "@/components/tools/ai-chat-tool";
import { CitationGeneratorTool } from "@/components/tools/citation-generator-tool";
import { QuillbotFlowTool } from "@/components/tools/quillbot-flow-tool";

export default function Home() {
  const [activeTab, setActiveTab] = useState("paraphrase");

  const renderTool = () => {
    switch (activeTab) {
      case "paraphrase":
        return <ParaphraseTool />;
      case "grammar":
        return <GrammarTool />;
      case "ai-detector":
        return <AiDetectorTool />;
      case "plagiarism":
        return <PlagiarismCheckerTool />;
      case "ai-humanizer":
        return <AiHumanizerTool />;
      case "ai-chat":
        return <AiChatTool />;
      case "translate":
        return <TranslateTool />;
      case "summarizer":
        return <SummarizerTool />;
      case "citation":
        return <CitationGeneratorTool />;
      case "flow":
        return <QuillbotFlowTool />;
      case "synonym":
        return <SynonymTool />;
      case "extender":
        return <ExtenderTool />;
      case "history":
        return <HistoryTool />;
      case "premium":
        return <PremiumTool />;
      default:
        return <ParaphraseTool />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTool()}
    </Layout>
  );
}
