import { log } from '../utils/index.js';
import { wireSkills } from './install.js';

export async function sync(cwd: string): Promise<void> {
  log.info('Re-scanning and re-wiring agent directories...');
  await wireSkills(cwd);
  log.success('Sync complete');
}
