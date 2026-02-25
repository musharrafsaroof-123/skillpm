import { npm, log } from '../utils/index.js';
import { readPackageJson } from '../manifest/index.js';

export async function publish(args: string[], cwd: string): Promise<void> {
  // Validate "agent-skill" keyword is present
  const pkg = await readPackageJson(cwd);
  if (pkg && (!pkg.keywords || !pkg.keywords.includes('agent-skill'))) {
    log.error(
      'package.json must include "agent-skill" in keywords. Run skillpm init or add it manually.',
    );
    process.exit(1);
  }

  log.info('Publishing to npmjs.org...');
  try {
    const result = await npm(['publish', ...args], { cwd });
    if (result.stderr) process.stderr.write(result.stderr);
    if (result.stdout) process.stdout.write(result.stdout);
    log.success('Published');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    log.error(`npm publish failed: ${msg}`);
    process.exit(1);
  }
}
