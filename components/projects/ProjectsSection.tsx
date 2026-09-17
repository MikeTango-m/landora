"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { PROJECT_CATEGORIES, PROJECTS, type Project } from "@/content/projects";
import { EASE_EXPO } from "@/components/hero/motion";
import { ConceptTag, ProjectDialog } from "./ProjectDialog";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectsSection() {
  const [category, setCategory] = useState<string>(PROJECT_CATEGORIES[0]);
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = category === PROJECT_CATEGORIES[0] ? PROJECTS : PROJECTS.filter((p) => p.category === category);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="projetos"
        aria-labelledby="projetos-title"
        className="relative overflow-hidden bg-ink px-[clamp(20px,4vw,56px)] py-[clamp(72px,11vh,128px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_80%_at_20%_0%,rgba(37,99,235,.10),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6"
          >
            <div className="max-w-[640px]">
              <p className="flex items-center gap-3 text-[11.5px] tracking-[.16em] text-muted uppercase">
                <span aria-hidden className="hero-rule h-px w-[clamp(24px,4vw,54px)]" />
                Projetos
              </p>
              <h2
                id="projetos-title"
                className="mt-4 text-[clamp(30px,4.2vw,52px)] leading-[1.02] font-extrabold tracking-[-.03em] text-balance"
              >
                Páginas pensadas <span className="hero-headline-gradient">para converter.</span>
              </h2>
              <p className="mt-4 max-w-[560px] text-[clamp(15px,1.1vw,17px)] leading-[1.62] text-pretty text-fg-2">
                Cada landing page começa num objetivo concreto. Estes são exemplos do tipo de trabalho que fazemos,
                por setor.
              </p>
            </div>

            <div role="group" aria-label="Filtrar por setor" className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(c)}
                    className={`relative rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${
                      active
                        ? "border-sky/45 text-fg"
                        : "border-white/10 text-fg-2 hover:border-white/25 hover:text-fg"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="project-filter-pill"
                        transition={{ duration: 0.45, ease: EASE_EXPO }}
                        className="absolute inset-0 rounded-full bg-accent/20"
                      />
                    )}
                    <span className="relative">{c}</span>
                  </button>
                );
              })}
            </div>
          </motion.header>

          <p className="sr-only" aria-live="polite">
            {visible.length === 1 ? "1 projeto" : `${visible.length} projetos`}
          </p>

          <motion.ul layout className="mt-[clamp(36px,5vh,56px)] grid gap-5 sm:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, i) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE_EXPO, delay: (i % 2) * 0.08 }}
                >
                  <ProjectCard project={project} onOpen={() => setSelected(project)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      </section>
    </MotionConfig>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[14px] border border-white/[.08] bg-white/[.02] p-3 transition-[border-color,background-color,transform,box-shadow] duration-300 ease-expo hover:-translate-y-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sky hover:border-sky/35 hover:bg-white/[.035] hover:shadow-[0_18px_50px_rgba(2,3,8,.6),0_0_40px_rgba(37,99,235,.10)] motion-reduce:hover:translate-y-0">
      <div className="overflow-hidden rounded-[10px]">
        <ProjectMedia
          project={project}
          variant="card"
          className="transition-transform duration-500 ease-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <p className="flex flex-wrap items-center gap-2 text-[11px] tracking-[.16em] text-muted uppercase">
          {project.category}
          {project.concept && <ConceptTag />}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-.01em]">
          {/* Stretched button: the whole card is the hit area, the heading is the accessible name. */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:rounded-[14px] after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </button>
        </h3>
        <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-fg-2">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium text-sky-300">
          Ver detalhes
          <span aria-hidden className="transition-transform duration-300 ease-expo group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
