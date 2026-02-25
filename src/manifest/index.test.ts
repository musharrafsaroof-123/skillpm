import { describe, it, expect } from 'vitest';
import { readPackageJson, parseSkillpmField, readSkillMd } from './index.js';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('readPackageJson', () => {
  let tmpDir: string;

  it('returns parsed package.json', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'skillpm-manifest-'));
    await writeFile(
      join(tmpDir, 'package.json'),
      JSON.stringify({ name: 'test-pkg', version: '1.0.0' }),
    );
    const result = await readPackageJson(tmpDir);
    expect(result).toEqual({ name: 'test-pkg', version: '1.0.0' });
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('returns null when no package.json exists', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'skillpm-manifest-'));
    const result = await readPackageJson(tmpDir);
    expect(result).toBeNull();
    await rm(tmpDir, { recursive: true, force: true });
  });
});

describe('parseSkillpmField', () => {
  it('returns undefined when no skillpm field', () => {
    const result = parseSkillpmField({ name: 'x', version: '1.0.0' });
    expect(result).toBeUndefined();
  });

  it('parses valid skillpm.mcpServers', () => {
    const result = parseSkillpmField({
      name: 'x',
      version: '1.0.0',
      skillpm: { mcpServers: ['server-a'] },
    });
    expect(result).toEqual({ mcpServers: ['server-a'] });
  });

  it('throws on invalid skillpm field', () => {
    expect(() =>
      parseSkillpmField({
        name: 'x',
        version: '1.0.0',
        skillpm: { unknown: true } as never,
      }),
    ).toThrow('Invalid skillpm field');
  });
});

describe('readSkillMd', () => {
  it('parses SKILL.md frontmatter', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'skillpm-skill-'));
    await writeFile(
      join(tmpDir, 'SKILL.md'),
      '---\nname: test\ndescription: A test skill\n---\n# Test\n',
    );
    const result = await readSkillMd(tmpDir);
    expect(result).toEqual({ name: 'test', description: 'A test skill' });
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('returns null when no SKILL.md exists', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'skillpm-skill-'));
    const result = await readSkillMd(tmpDir);
    expect(result).toBeNull();
    await rm(tmpDir, { recursive: true, force: true });
  });
});
