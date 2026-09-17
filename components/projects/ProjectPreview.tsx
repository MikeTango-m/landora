import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/content/projects";

type ProjectPreviewProps = {
  preview: Project["preview"];
  className?: string;
};

/**
 * Code-drawn wireframe of a landing page inside a browser frame — stands in for
 * screenshots until real project images exist. Purely decorative.
 */
export function ProjectPreview({ preview, className = "" }: ProjectPreviewProps) {
  const [bg, surface, accent] = preview.colors;
  const vars = { "--pv-bg": bg, "--pv-surface": surface, "--pv-accent": accent } as CSSProperties;

  return (
    <div
      aria-hidden
      style={vars}
      className={`relative aspect-[16/10] overflow-hidden rounded-[10px] border border-white/10 bg-(--pv-bg) ${className}`}
    >
      {/* browser chrome */}
      <div className="flex h-[9%] items-center gap-[1.2%] border-b border-white/[.06] px-[3%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="aspect-square h-[32%] rounded-full bg-white/15" />
        ))}
        <span className="ml-[3%] h-[36%] w-[38%] rounded-full bg-white/[.06]" />
      </div>

      {/* page */}
      <div className="relative h-[91%] px-[6%] pt-[5%]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(60% 55% at 75% 30%, ${accent}33, transparent 70%)` }}
        />
        <div className="relative flex items-center justify-between">
          <span className="h-[5px] w-[14%] rounded-full bg-white/70" />
          <span className="flex w-[34%] justify-end gap-[8%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[3px] w-[22%] rounded-full bg-white/25" />
            ))}
          </span>
        </div>
        <div className="relative mt-[6%] h-[78%]">{LAYOUTS[preview.layout]}</div>
      </div>
    </div>
  );
}

const Bar = ({ w, strong = false, className = "" }: { w: string; strong?: boolean; className?: string }) => (
  <span
    className={`block h-[7%] rounded-full ${strong ? "bg-white/85" : "bg-white/20"} ${className}`}
    style={{ width: w }}
  />
);

const Cta = ({ className = "" }: { className?: string }) => (
  <span className={`block h-[10%] w-[26%] rounded-md bg-(--pv-accent) shadow-[0_4px_18px_var(--pv-accent)] ${className}`} />
);

const LAYOUTS: Record<Project["preview"]["layout"], ReactNode> = {
  split: (
    <div className="flex h-full gap-[6%]">
      <div className="flex w-1/2 flex-col gap-[5%] pt-[4%]">
        <Bar w="90%" strong />
        <Bar w="70%" strong />
        <Bar w="85%" className="mt-[4%] h-[4%]!" />
        <Bar w="60%" className="h-[4%]!" />
        <Cta className="mt-[6%] w-[46%]!" />
      </div>
      <div
        className="w-1/2 rounded-lg border border-white/10"
        style={{ background: "linear-gradient(145deg, var(--pv-surface), var(--pv-accent))" }}
      />
    </div>
  ),
  centered: (
    <div className="flex h-full flex-col items-center gap-[4%] pt-[2%]">
      <Bar w="62%" strong />
      <Bar w="44%" strong />
      <Bar w="54%" className="mt-[2%] h-[4%]!" />
      <Cta className="mt-[3%]" />
      <div className="mt-auto mb-[4%] grid h-[34%] w-full grid-cols-3 gap-[4%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="rounded-md border border-white/10 bg-(--pv-surface)" />
        ))}
      </div>
    </div>
  ),
  stacked: (
    <div className="flex h-full flex-col gap-[4%]">
      <div className="flex items-end justify-between">
        <div className="flex w-[55%] flex-col gap-[10px]">
          <Bar w="100%" strong className="h-[6px]!" />
          <Bar w="72%" strong className="h-[6px]!" />
        </div>
        <Cta className="h-[12px]! w-[22%]!" />
      </div>
      <div className="mt-[3%] flex flex-1 flex-col gap-[6%] rounded-t-lg border border-b-0 border-white/10 bg-(--pv-surface) p-[4%]">
        {["80%", "64%", "72%"].map((w, i) => (
          <span key={i} className="flex items-center gap-[4%]">
            <span className="aspect-square h-[10px] rounded-sm bg-(--pv-accent) opacity-80" />
            <span className="h-[4px] rounded-full bg-white/20" style={{ width: w }} />
          </span>
        ))}
      </div>
    </div>
  ),
};
