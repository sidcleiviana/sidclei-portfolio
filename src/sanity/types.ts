/**
 * Typed shapes returned by the GROQ projections in `src/sanity/queries`.
 *
 * These are the *query result* contracts — the UI consumes them directly.
 * When `sanity typegen` is adopted, generated types can replace this file
 * without touching component code (Sprint §35).
 */

export type PortableText = Array<Record<string, unknown>>;

export interface SanityImage {
  _type?: string;
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export type ProjectType = "production" | "professional" | "lab" | "study";
export type ProjectVisibility = "public" | "anonymized" | "private";
export type ProjectStatus = "draft" | "published";
export type Authorship = "individual" | "team" | "participation";

export interface DateRange {
  startDate?: string;
  endDate?: string;
  ongoing?: boolean;
}

export interface SkillRef {
  _id: string;
  name: string;
  slug: string;
  category?: string;
}

export interface TechnologyRef {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  icon?: SanityImage | null;
}

export interface ExternalLink {
  _key?: string;
  label: string;
  url: string;
  kind?: string;
}

export interface Evidence {
  _key?: string;
  type: string;
  label: string;
  url?: string;
  description?: string;
}

export interface Metric {
  _key?: string;
  label: string;
  value?: string;
  unit?: string;
  before?: string;
  after?: string;
  description?: string;
}

export interface Contribution {
  authorship: Authorship;
  teamContext?: string;
  roles?: string[];
  responsibilities?: string[];
  summary?: string;
}

export interface Seo {
  title?: string;
  description?: string;
  ogImage?: SanityImage | null;
  noIndex?: boolean;
}

export interface ExperienceRef {
  _id: string;
  company: string;
  role: string;
  period?: DateRange | null;
}

export interface EducationRef {
  _id: string;
  institution: string;
  course: string;
}

// -- content blocks ----------------------------------------------------------

interface BlockBase {
  _key: string;
  _type: string;
}
export interface RichTextBlock extends BlockBase {
  _type: "richTextBlock";
  body: PortableText;
}
export interface ImageBlock extends BlockBase {
  _type: "imageBlock";
  image: SanityImage;
  wide?: boolean;
}
export interface GalleryBlock extends BlockBase {
  _type: "galleryBlock";
  heading?: string;
  images: SanityImage[];
}
export interface VideoBlock extends BlockBase {
  _type: "videoBlock";
  url: string;
  title?: string;
  poster?: SanityImage | null;
  caption?: string;
}
export interface MetricGridBlock extends BlockBase {
  _type: "metricGridBlock";
  heading?: string;
  metrics: Metric[];
}
export interface BeforeAfterSide {
  label?: string;
  description?: string;
  image?: SanityImage | null;
}
export interface BeforeAfterBlock extends BlockBase {
  _type: "beforeAfterBlock";
  heading?: string;
  before?: BeforeAfterSide;
  after?: BeforeAfterSide;
}
export interface ArchitectureBlock extends BlockBase {
  _type: "architectureBlock";
  heading?: string;
  description?: PortableText;
  diagram?: SanityImage | null;
}
export interface TimelineBlock extends BlockBase {
  _type: "timelineBlock";
  heading?: string;
  entries: Array<{
    _key: string;
    date?: string;
    title: string;
    description?: string;
  }>;
}
export interface TechnicalDecisionsBlock extends BlockBase {
  _type: "technicalDecisionsBlock";
  heading?: string;
  decisions: Array<{ _key: string; question: string; rationale: PortableText }>;
}
export interface LearningBlock extends BlockBase {
  _type: "learningBlock";
  heading?: string;
  body?: PortableText;
  takeaways?: string[];
}
export interface CalloutBlock extends BlockBase {
  _type: "calloutBlock";
  tone?: "info" | "success" | "warning" | "note";
  title?: string;
  body: PortableText;
}
export interface LinksBlock extends BlockBase {
  _type: "linksBlock";
  heading?: string;
  links: ExternalLink[];
}

export type KnownContentBlock =
  | RichTextBlock
  | ImageBlock
  | GalleryBlock
  | VideoBlock
  | MetricGridBlock
  | BeforeAfterBlock
  | ArchitectureBlock
  | TimelineBlock
  | TechnicalDecisionsBlock
  | LearningBlock
  | CalloutBlock
  | LinksBlock;

/** A block whose `_type` has no registered renderer yet. */
export interface UnknownContentBlock extends BlockBase {
  [key: string]: unknown;
}

export type ContentBlock = KnownContentBlock | UnknownContentBlock;

// -- projects --------------------------------------------------------------

export interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  projectType: ProjectType;
  featured: boolean;
  coverImage: SanityImage | null;
  period: DateRange | null;
  visibility: ProjectVisibility;
  technologies: TechnologyRef[];
  contribution: Contribution | null;
}

export interface ProjectDetail extends ProjectListItem {
  context?: string;
  problem?: string;
  publishedAt?: string;
  skills: SkillRef[];
  relatedExperience?: ExperienceRef | null;
  relatedEducation?: EducationRef | null;
  links: ExternalLink[];
  evidence: Evidence[];
  metrics: Metric[];
  contentBlocks: ContentBlock[];
  confidentialityNotice?: string;
  seo?: Seo | null;
}

// -- profile / settings --------------------------------------------------

export interface Profile {
  name: string;
  headline: string;
  shortSummary?: string;
  about?: PortableText;
  publicLocation?: string;
  photo?: SanityImage | null;
  professionalEmail?: string;
  resumeUrl?: string;
  links: ExternalLink[];
}

export interface SiteSettings {
  title: string;
  description?: string;
  defaultOgImage?: SanityImage | null;
  primaryNav: ExternalLink[];
  footerNote?: string;
}
