# skillpm

**Agent Skill package manager — thin orchestration layer on top of npm.**

skillpm manages [Agent Skill](https://agentskills.io) dependency trees with full transitive resolution and wires installed skills into agent directories, configuring any required MCP servers along the way.

<div class="grid cards" markdown>

- :material-download: **Install skills** — `skillpm install <skill>` handles npm, agent linking, and MCP config in one step
- :material-tree: **Transitive deps** — skill dependencies resolve automatically through the full tree
- :material-link: **Agent wiring** — links skills into 37+ agent directories (Claude, Cursor, VS Code, Codex, etc.)
- :material-server: **MCP servers** — collects and configures MCP servers declared by skills

</div>

## Quick start

```bash
# Install skillpm globally
npm install -g skillpm

# Install a skill (+ all transitive skill deps + MCP servers)
skillpm install refactor-react

# List installed skills
skillpm list
```

## How it works

When you run `skillpm install refactor-react`:

1. **npm install** — npm handles resolution, download, lockfile, `node_modules/`
2. **Scan** — skillpm scans `node_modules/` for packages containing `skills/*/SKILL.md`
3. **Link** — for each skill found, skillpm calls [`skills`](https://www.npmjs.com/package/skills) to wire it into agent directories
4. **MCP config** — skillpm collects `skillpm.mcpServers` from all skills (transitively) and configures each via [`add-mcp`](https://github.com/neondatabase/add-mcp)

That's it. Agents see the full skill tree with MCP servers configured.

## Why skillpm?

Existing tools handle parts of the problem:

| Tool | What it does | What it doesn't do |
|---|---|---|
| **npm** | Package management | Doesn't know about skills or agent directories |
| **[skills](https://www.npmjs.com/package/skills)** | Wires skills into agent dirs | Doesn't manage dependencies |
| **[add-mcp](https://github.com/neondatabase/add-mcp)** | Configures MCP servers | Isn't connected to skill packages |

**skillpm** is the glue — it orchestrates all three so you get transitive skill dependency resolution with a single command.
