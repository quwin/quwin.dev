"use client";

import { useEffect, useRef, useState } from "react";

type PresetQA = {
  question: string;
  answer: string;
};

type ProjectOption = {
  label: string;
  collectionName: string;
  description: string;
  placeholder: string;
  presets: PresetQA[];
};

const aboutMePresets: PresetQA[]  = [

]
const ragPresets: PresetQA[]  = [
    {
        question: "What does the RAG pipeline do?",
        answer: "The RAG pipeline ingests GitHub repository documentation, chunks it, embeds it, stores dense and sparse vectors in Qdrant, retrieves relevant context, reranks results, and generates grounded answers with citations.",
    },
    {
    question: "Why use hybrid retrieval?",
    answer: "Hybrid retrieval combines dense semantic search with sparse keyword-aware search, which is useful for technical documentation where exact names, file paths, config keys, and function names matter.",
    },
]
const portfolioPresets: PresetQA[]  = [
    {   
        question: "What stack does this portfolio use?",
        answer: "This portfolio uses Next.js, React, TypeScript, Tailwind CSS, and Vercel for deployment.",
    },
    {
        question: "How is the portfolio organized?",
        answer:"The portfolio is organized into reusable React components for the viewport hero, content sections, navigation, education, experience, projects, and the project assistant.",
    },
]
const solverPresets: PresetQA[]  = [

]
const gamePresets: PresetQA[]  = [

]
const infiniportalPresets: PresetQA[]  = [

]

const PROJECTS: ProjectOption[] = [
  {
    label: "About Me",
    collectionName: "quwin_quwin",
    description: "Ask about Ethan's background, skills, education, and experience.",
    placeholder: "What sports does Ethan enjoy?",
    presets: aboutMePresets,
  },
  {
    label: "RAG Pipeline",
    collectionName: "quwin_RAG-Github-Documentation-Pipeline",
    description: "Ask about ingestion, Qdrant, hybrid retrieval, and FastAPI.",
    placeholder: "What methods are used to ensure that citations are accurate?",
    presets: ragPresets,
  },
  {
    label: "Portfolio Website",
    collectionName: "quwin_quwin.dev",
    description: "Ask about the Next.js portfolio site.",
    placeholder: "How did this website integrate this LLM?",
    presets: portfolioPresets,
  },
  {
    label: "UnderTheGun",
    collectionName: "quwin_UnderTheGun",
    description: "Ask about the GPU-accelerated postflop poker solver.",
    placeholder: "How long does the solver take, and how does it compare to other solvers?",
    presets: solverPresets,
  },
  {
    label: "Belevator",
    collectionName: "quwin_Belevator-Tactics",
    description: "Ask about my physics-based deterministic mobile game.",
    placeholder: "Where can I download the game?",
    presets: gamePresets,
  },
  {
    label: "infiniport.al",
    collectionName: "quwin_infiniport.al",
    description: "Ask about the full-stack platform and Discord chatbot.",
    placeholder: "How many Discord servers added the Chatbot?",
    presets: infiniportalPresets,
  },
];

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
  projectLabel?: string;
  sources?: SourceChunk[];
  confidence?: AskResponse["confidence"];
};

export default function ProjectAssistant() {
  const [selectedProject, setSelectedProject] = useState<ProjectOption>(
    PROJECTS[0]
  );

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Choose a project, then ask about its implementation, architecture, tech stack, and/or deployment.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);
  function handlePresetClick(preset: PresetQA) {
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: preset.question,
      projectLabel: selectedProject.label,
    },
    {
      role: "assistant",
      content: preset.answer,
      projectLabel: selectedProject.label,
    },
  ]);
}
  function handleProjectChange(project: ProjectOption) {
    setSelectedProject(project);

    setMessages((prev) => [
      ...prev,
    ]);
  }

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = question.trim();

    if (!trimmed || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: trimmed,
        projectLabel: selectedProject.label,
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
          collection_name: selectedProject.collectionName,
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
          projectLabel: selectedProject.label,
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
          projectLabel: selectedProject.label,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="font-lato my-12 rounded-2xl border border-limed-oak/30 bg-quarter-spanish-white/40 p-6 shadow-sm">
      <div className="font-playfair text-3xl font-bold">
        ask "me" anything
      </div>

      <p className="mt-2 text-base">
        Select a project, then ask the RAG assistant about it.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {PROJECTS.map((project) => {
          const isActive =
            project.collectionName === selectedProject.collectionName;

          return (
            <button 
              key={project.collectionName}
              type="button"
              onClick={() => handleProjectChange(project)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? "bg-limed-oak text-white"
                  : "bg-white text-limed-oak hover:bg-limed-oak/10"
              }`}
            >
              {project.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm">
        <span className="font-bold">Current context:</span>{" "}
        {selectedProject.description}
      </div>

      <div className="mt-6 h-88 space-y-4 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "ml-auto max-w-[80%] rounded-xl bg-limed-oak px-4 py-3 text-white"
                : "mr-auto max-w-[80%] rounded-xl bg-white px-4 py-3"
            }
          >
            {message.projectLabel && (
              <div className="mb-2 text-xs font-bold opacity-70">
                {message.projectLabel}
              </div>
            )}

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
          <div className="mr-auto max-w-[80%] rounded-xl bg-white px-4 py-3">
            Searching {selectedProject.label}...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      {selectedProject.presets.length > 0 && (
        <div className="mt-6">
            <div className="mb-2 text-sm font-bold opacity-70">
            Common questions
            </div>
            <div className="flex flex-wrap gap-2">
            {selectedProject.presets.map((preset) => (
                <button
                key={preset.question}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-limed-oak transition hover:bg-limed-oak hover:text-white"
                >
                {preset.question}
                </button>
            ))}
            </div>
        </div>
        )}
      <form onSubmit={handleAsk} className="mt-6 flex gap-3">
        <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={selectedProject.placeholder}
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