"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground"
    >
      <ArrowUp className="h-4 w-4" />
      Back to top
    </button>
  );
}