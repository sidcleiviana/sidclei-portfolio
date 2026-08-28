import type { SchemaTypeDefinition } from "sanity";

// documents
import { certification } from "./documents/certification";
import { education } from "./documents/education";
import { experience } from "./documents/experience";
import { learningItem } from "./documents/learningItem";
import { profile } from "./documents/profile";
import { project } from "./documents/project";
import { siteSettings } from "./documents/siteSettings";
import { skill } from "./documents/skill";
import { technology } from "./documents/technology";
// objects
import { projectBlockTypes } from "./objects/blocks";
import { dateRange } from "./objects/dateRange";
import { evidence } from "./objects/evidence";
import { externalLink } from "./objects/externalLink";
import { imageWithAlt } from "./objects/imageWithAlt";
import { metric } from "./objects/metric";
import { projectContribution } from "./objects/projectContribution";
import { seo } from "./objects/seo";

export const documentTypes: SchemaTypeDefinition[] = [
  siteSettings,
  profile,
  project,
  skill,
  technology,
  experience,
  education,
  certification,
  learningItem,
];

export const objectTypes: SchemaTypeDefinition[] = [
  dateRange,
  imageWithAlt,
  externalLink,
  evidence,
  metric,
  projectContribution,
  seo,
  ...projectBlockTypes,
];

export const schemaTypes: SchemaTypeDefinition[] = [
  ...documentTypes,
  ...objectTypes,
];
