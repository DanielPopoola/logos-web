"use client";

import { useState, type FormEvent } from "react";
import { askQuestion } from "@/lib/api/ask-client";
import { ApiError } from "@/lib/api/client";
import type { AskResponse } from "@/lib/api/types";
import { AiGeneratedBadge } from "@/components/sermon/AiGeneratedBadge";
import { AskSourceCard } from "@/components/ask/AskSourceCard";

type AskState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "answered"; response: AskResponse }
  | { kind: "error"; message: string };

export function AskPanel() {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState<AskState>({ kind: "idle" });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setState({ kind: "loading" });

    try {
      const response = await askQuestion(trimmed);
      setState({ kind: "answered", response });
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Something went wrong answering that. Please try again.",
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What have my sermons taught me about..."
          className="flex-1 bg-surface-container-lowest rounded-2xl px-5 py-3.5 text-base outline-none border-2 border-transparent focus:border-tertiary-container shadow-[0_2px_12px_-2px_rgba(43,36,32,0.05)]"
        />
        <button
          type="submit"
          disabled={state.kind === "loading" || question.trim().length === 0}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-tertiary text-on-tertiary font-bold text-sm shadow-[0_4px_16px_-2px_rgba(77,68,227,0.35)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {state.kind === "loading" ? "Thinking..." : "Ask"}
        </button>
      </form>
      <p className="text-xs text-on-surface-variant mb-8">
        Answers are grounded only in sermons you&apos;ve saved to your library.
      </p>

      {state.kind === "answered" && (
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_2px_16px_-4px_rgba(43,36,32,0.05)]">
            <div className="mb-3">
              <AiGeneratedBadge />
            </div>
            <p className="text-base leading-relaxed">{state.response.answer}</p>
          </div>

          {state.response.sources.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wide mb-3">
                Sources
              </h3>
              <div className="flex flex-col gap-3">
                {state.response.sources.map((source, i) => (
                  <AskSourceCard key={`${source.sermon_id}-${i}`} source={source} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {state.kind === "error" && (
        <p className="text-sm text-on-error-container bg-error-container rounded-xl px-4 py-3">
          {state.message}
        </p>
      )}
    </div>
  );
}