// Shared shapes for everything in src/data. Edit the data files, not this one,
// unless you want to add a brand-new field.

export interface Link {
  label: string;
  url: string;
}

export interface PipelineStep {
  /** Short node label shown in the "How it works" diagram. */
  label: string;
  /** One line explaining the step. */
  detail: string;
}

export interface ProjectResult {
  /** e.g. "Face ID accuracy" */
  label: string;
  /** e.g. "96% on 40 test photos". Only add numbers you have measured. */
  value: string;
  /** Optional footnote, e.g. how/where it was measured. */
  note?: string;
}

export interface ProjectImage {
  /** Path inside public/, e.g. '/projects/attendly.webp'. */
  src: string;
  /** Describe what the screenshot shows, for screen readers. */
  alt: string;
  /** Pixel size of the file (prevents layout shift while it loads). */
  width: number;
  height: number;
  /** Text in the frame's top bar. Defaults to the live demo's address. */
  caption?: string;
}

export interface Project {
  /** Stable id used for anchors and the skills filter. */
  id: string;
  name: string;
  subtitle: string;
  /** One-sentence hook shown at the top of the card. */
  summary: string;
  /** Longer explanation, one paragraph per array item. */
  description: string[];
  /** Tech chips displayed on the card. */
  tech: string[];
  /**
   * Skill names (exactly as written in skills.ts) this project uses.
   * Drives the skills → projects highlight filter.
   */
  skills: string[];
  /** Deployed app. Leave undefined if there is none. */
  live?: string;
  /** One or more GitHub repositories. */
  repos: Link[];
  /** Screenshot shown on the card. Leave undefined to show none. */
  image?: ProjectImage;
  /** Showcase video (YouTube / Loom). A "Watch demo" button appears when set. */
  video?: string;
  /** Real, measured results. The block renders only when this has items. */
  results?: ProjectResult[];
  /** Steps of the animated "How it works" diagram. */
  pipeline: PipelineStep[];
  /** Small linked chips (used for the research project's mini projects). */
  minorProjects?: Link[];
}

export interface SkillGroup {
  title: string;
  /** Short mono label, e.g. "ml" */
  tag: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
  detail?: string;
  /** Shown as a small badge, e.g. "Pursuing" */
  badge?: string;
}
