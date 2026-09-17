import Image from "next/image";
import type { Project } from "@/content/projects";
import { ProjectPreview } from "./ProjectPreview";

type ProjectMediaProps = {
  project: Project;
  /** "card": fixed 3:2 crop from the top. "full": the whole image at its own ratio. */
  variant: "card" | "full";
  className?: string;
};

/** The project's image when it has one, otherwise the code-drawn preview. */
export function ProjectMedia({ project, variant, className = "" }: ProjectMediaProps) {
  const { image } = project;
  if (!image) return <ProjectPreview preview={project.preview} className={className} />;

  if (variant === "full") {
    return (
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(min-width: 768px) 520px, 100vw"
        className={`h-auto w-full rounded-[10px] border border-white/10 ${className}`}
      />
    );
  }

  return (
    <div className={`relative aspect-[3/2] overflow-hidden rounded-[10px] border border-white/10 bg-ink-2 ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-top"
      />
    </div>
  );
}
