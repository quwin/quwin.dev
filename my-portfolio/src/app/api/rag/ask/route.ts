import { NextRequest, NextResponse } from "next/server";

type AskRequest = {
  question: string;
  collection_name?: string;
};

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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AskRequest;

    if (!body.question || body.question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const ragApiUrl = process.env.RAG_API_URL;

    if (!ragApiUrl) {
      return NextResponse.json(
        { error: "RAG_API_URL is not configured." },
        { status: 500 }
      );
    }
    const additionalHeader: string = "In a brief, cited response wiithout extra details, answer the question: "
    const response = await fetch(`${ragApiUrl}/v1/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.RAG_API_KEY
          ? { Authorization: `Bearer ${process.env.RAG_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        question: additionalHeader + body.question,
        collection_name: body.collection_name ?? "quwin_quwin",
        top_k: 20,
        rerank_top_k: 5,
        dense_weight: 1.0,
        sparse_weight: 1.0,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          error: "RAG backend request failed.",
          detail: errorText,
        },
        { status: response.status }
      );
    }

    const data = (await response.json()) as AskResponse;

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while querying RAG backend." },
      { status: 500 }
    );
  }
}