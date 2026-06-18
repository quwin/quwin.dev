"use client";

import { useState } from "react";

type SourceChunk = {
  chunk_id: string | null;
  source_path: string | null;
  repo_url: string | null;
  section_heading: string | null;
  retrieval_score: number | null;
  cross_score: number | null;
  text_preview: string;
};

type AskResponse = {
  question: string;
  answer: string;
  sources: SourceChunk[];
  confidence: {
    retrieval_confidence: number;
    answer_completeness: number;
    valid_citations: number[];
    invalid_citations: number[];
  } | null;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: SourceChunk[];
  confidence?: AskResponse["confidence"];
};

export default function ProjectAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me about Ethan's projects, portfolio website, RAG pipeline, tech stack, or implementation details.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = question.trim();

    if (!trimmed || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: trimmed,
      },
    ]);

    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/rag/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
          collection_name: "quwin_quwin.dev",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to query RAG backend.");
      }

      const data = (await response.json()) as AskResponse;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
          confidence: data.confidence,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the project assistant backend. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="font-lato my-12 rounded-2xl border border-limed-oak/30 bg-quarter-spanish-white/40 p-6 shadow-sm">
      <div className="font-playfair text-3xl font-bold">
        ask about my projects
      </div>

      <p className="mt-2 text-base">
        Query the RAG pipeline powering this portfolio.
      </p>

      <div className="mt-6 max-h-96 space-y-4 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-xl bg-limed-oak px-4 py-3 text-white"
                : "mr-auto max-w-[85%] rounded-xl bg-white px-4 py-3"
            }
          >
            <p className="whitespace-pre-wrap">{message.content}</p>

            {message.sources && message.sources.length > 0 && (
              <div className="mt-4 border-t pt-3 text-sm">
                <div className="font-bold">Sources</div>

                <div className="mt-2 space-y-2">
                  {message.sources.slice(0, 3).map((source, sourceIndex) => (
                    <div key={sourceIndex}>
                      <div className="font-bold">
                        {source.source_path ?? "Unknown source"}
                      </div>

                      {source.section_heading && (
                        <div>Section: {source.section_heading}</div>
                      )}

                      {source.repo_url && (
                        <a
                          href={source.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          View repository
                        </a>
                      )}

                      <p className="mt-1 line-clamp-2 opacity-80">
                        {source.text_preview}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {message.confidence && (
              <div className="mt-3 text-xs opacity-70">
                Retrieval confidence:{" "}
                {Math.round(message.confidence.retrieval_confidence * 100)}% ·
                Answer completeness:{" "}
                {Math.round(message.confidence.answer_completeness * 100)}%
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto max-w-[85%] rounded-xl bg-white px-4 py-3">
            Thinking...
          </div>
        )}
      </div>

      <form onSubmit={handleAsk} className="mt-6 flex gap-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Provide a brief summary of this project?"
          className="flex-1 rounded-xl border border-limed-oak/30 px-4 py-3 outline-none"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-limed-oak px-5 py-3 font-bold text-white disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </div>
  );
}