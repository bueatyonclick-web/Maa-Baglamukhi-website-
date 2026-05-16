import React, { memo } from "react";
import { Quote } from "lucide-react";
import GlowDivider from "./GlowDivider";
import SpiritualCard, { SpiritualPoint } from "./SpiritualCard";

/** Renders **bold** markers in translated strings. */
export function renderBoldText(text) {
  if (!text || typeof text !== "string") return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-amber-100/95">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function FormattedStoryContent({ paragraphs = [], quote, points = [], isHi }) {
  const bodyClass = isHi ? "font-deva text-base leading-relaxed sm:text-lg" : "text-base leading-relaxed sm:text-lg";

  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <p key={i} className={`text-white/72 ${bodyClass}`}>
          {renderBoldText(p)}
        </p>
      ))}

      {quote ? (
        <SpiritualCard className="border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-black/40">
          <div className="flex gap-4">
            <Quote className="h-8 w-8 shrink-0 text-amber-400/80" aria-hidden />
            <blockquote className={`text-lg italic text-amber-50/90 sm:text-xl ${isHi ? "font-deva leading-relaxed" : "font-serif"}`}>
              {quote}
            </blockquote>
          </div>
        </SpiritualCard>
      ) : null}

      {points?.length > 0 ? (
        <>
          <GlowDivider />
          <ul className="grid gap-3 sm:grid-cols-2">
            {points.map((pt) => (
              <SpiritualPoint key={pt} text={pt} />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export default memo(FormattedStoryContent);
