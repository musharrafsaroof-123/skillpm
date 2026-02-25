import pc from 'picocolors';

export function info(msg: string): void {
  console.log(pc.blue('ℹ'), msg);
}

export function success(msg: string): void {
  console.log(pc.green('✓'), msg);
}

export function warn(msg: string): void {
  console.log(pc.yellow('⚠'), msg);
}

export function error(msg: string): void {
  console.error(pc.red('✗'), msg);
}

export function skill(name: string, version?: string): string {
  return version ? `${pc.bold(name)}@${pc.dim(version)}` : pc.bold(name);
}
