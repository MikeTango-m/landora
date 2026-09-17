"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/content/projects";
import { projectInterestMessage, whatsappLink } from "@/lib/whatsapp";
import { ProjectMedia } from "./ProjectMedia";

type ProjectDialogProps = {
  project: Project | null;
  onClose: () => void;
};

/**
 * Project details in a native <dialog>: showModal() gives focus trapping and an
 * inert page for free. Focus returns to the card that opened it.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const cta = project ? whatsappLink(projectInterestMessage(project.name), "#contacto") : null;

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      // Handle Escape ourselves (preventDefault stops the native cancel) — the
      // native path does not fire reliably for every kind of key event.
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        e.preventDefault();
        onClose();
      }}
      // A click whose target is the <dialog> itself landed on the backdrop.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="project-dialog m-auto max-h-[min(92svh,860px)] w-[min(920px,calc(100vw-32px))] overflow-y-auto rounded-2xl border border-white/10 bg-ink-2 p-0 text-fg shadow-[0_30px_120px_rgba(0,0,0,.7),0_0_0_1px_rgba(37,99,235,.12)] backdrop:bg-ink/75 backdrop:backdrop-blur-sm"
    >
      {project && cta && (
        <div className="grid gap-8 p-[clamp(20px,4vw,40px)] md:grid-cols-[1.1fr_1fr]">
          <div className="md:sticky md:top-0 md:self-start">
            <ProjectMedia project={project} variant="full" className="shadow-[0_20px_60px_rgba(0,0,0,.5)]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex flex-wrap items-center gap-2 text-[11.5px] tracking-[.16em] text-muted uppercase">
                  {project.category}
                  {project.concept && <ConceptTag />}
                </p>
                <h3 id="project-dialog-title" className="mt-2 text-[clamp(24px,3vw,32px)] leading-tight font-bold tracking-[-.02em]">
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid size-10 flex-none place-items-center rounded-lg border border-white/[.14] bg-white/[.03] text-fg-2 transition-colors hover:border-sky/55 hover:text-fg"
              >
                <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            <p className="mt-4 leading-relaxed text-fg-2">{project.summary}</p>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm font-semibold text-soft">O desafio</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-2">{project.challenge}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-soft">A abordagem</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-2">{project.approach}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-soft">Secções da página</dt>
                <dd className="mt-2">
                  <ol className="grid gap-1.5 text-[15px] text-fg-2">
                    {project.sections.map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="w-5 flex-none text-right text-sm text-muted tabular-nums">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Funcionalidades">
              {project.features.map((f) => (
                <li key={f} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-[13px] text-badge">
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3 max-[480px]:flex-col">
              <a
                {...cta.anchorProps}
                onClick={cta.external ? undefined : onClose}
                className="hero-cta-primary inline-flex items-center justify-center gap-2.5 rounded-[10px] border border-sky-300/35 px-5 py-3.5 text-[15px] font-semibold text-fg transition-shadow"
              >
                Quero uma assim
                {cta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
                <span aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-[10px] border border-white/12 bg-white/[.035] px-5 py-3.5 text-[15px] font-medium text-soft transition-colors hover:border-sky-300/45 hover:bg-white/[.075]"
              >
                Ver outros projetos
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function ConceptTag() {
  return (
    <span
      title="Projeto de demonstração criado para mostrar o tipo de trabalho que fazemos"
      className="rounded-full border border-sky/30 bg-sky/10 px-2 py-0.5 text-[10px] font-semibold tracking-[.12em] text-sky-300 uppercase"
    >
      Demonstração
    </span>
  );
}
