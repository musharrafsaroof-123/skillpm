import { z } from 'zod';

export const SkillpmFieldSchema = z
  .object({
    mcpServers: z.array(z.string()).optional(),
  })
  .strict()
  .optional();

export type SkillpmField = z.infer<typeof SkillpmFieldSchema>;

export interface SkillPackageJson {
  name: string;
  version: string;
  keywords?: string[];
  dependencies?: Record<string, string>;
  skillpm?: SkillpmField;
}

export interface SkillInfo {
  name: string;
  version: string;
  path: string;
  /** Path to the skills/<name>/ subdirectory containing SKILL.md */
  skillDir: string;
  mcpServers: string[];
}
