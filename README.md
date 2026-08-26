# chubbyts-framework-skeleton

[![CI](https://github.com/chubbyts/chubbyts-framework-skeleton/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-framework-skeleton/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-framework-skeleton/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-framework-skeleton?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fchubbyts%2Fchubbyts-framework-skeleton%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-framework-skeleton/master)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-framework-skeleton&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-framework-skeleton)

## Description

A minimal skeleton for [chubbyts-framework][5].

## Requirements

 * node: 22
 * [@chubbyts/chubbyts-dic][2]: ^2.3.0
 * [@chubbyts/chubbyts-dic-config][3]: ^2.3.0
 * [@chubbyts/chubbyts-dic-types][4]: ^2.3.0
 * [@chubbyts/chubbyts-framework][5]: ^3.2.0
 * [@chubbyts/chubbyts-framework-router-path-to-regexp][6]: ^3.2.0
 * [@chubbyts/chubbyts-http-error][7]: ^3.4.0
 * [@chubbyts/chubbyts-log-types][8]: ^3.3.0
 * [@chubbyts/chubbyts-pino-adapter][9]: ^3.3.0
 * [@chubbyts/chubbyts-undici-server][10]: ^1.2.0
 * [@chubbyts/chubbyts-undici-server-node][11]: ^1.3.0
 * [commander][12]: ^15.0.0
 * [pino][13]: ^10.3.1

## Environment

Add the following environment variable to your system, for example within `~/.bashrc` or  `~/.zshrc`:

```sh
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)
```

### Mount points

Creates every file which gets mounted into the node container (shell rc/history, git, ssh, npm and the coding
agent auth/settings files) without overwriting existing ones. Adjust the seeded settings files afterwards to your
liking, they stay on the host and get mounted.

```sh
./setup-mount-points.sh
```

### Coding agents

The following coding agents (harnesses) are preinstalled within the node container, their auth and settings files
get mounted from the host (see `docker-compose.yml`):

 * [Claude Code](https://www.npmjs.com/package/@anthropic-ai/claude-code): `~/.claude.json`, `~/.claude/.credentials.json`, `~/.claude/settings.json`
 * [Codex](https://www.npmjs.com/package/@openai/codex): `~/.codex/auth.json`, `~/.codex/config.toml`
 * [Opencode](https://www.npmjs.com/package/opencode-ai): `~/.config/opencode/opencode.jsonc`, `~/.config/opencode/tui.json`, `~/.local/share/opencode/auth.json`
 * [PI](https://www.npmjs.com/package/@earendil-works/pi-coding-agent) incl. [pi-llama](https://github.com/huggingface/pi-llama): `~/.pi/agent/auth.json`

#### llama.cpp

PI can run against a local model via [pi-llama](https://github.com/huggingface/pi-llama), start a
[llama.cpp](https://llama.app/) server on the host, for example:

```sh
llama-server \
    -hf lmstudio-community/Qwen3.6-35B-A3B-GGUF:Q4_K_M \
    -c 32768 \
    -ngl 999 \
    --flash-attn on \
    --host 0.0.0.0 \
    --port 9931
```

### Docker

```sh
docker compose up -d
docker compose exec node bash
```

## Installation

```sh
pnpm start
```

## Urls

* GET https://localhost/ping

## Structure

### Command

Commands is code that is meant to be executed on command line.

 * [src/command.ts][20]

### Handler

Handler alias Controller, or Controller actions to be more precise.

 * [src/handler.ts][21]

### ServiceFactory

Service factories are the glue code of the dependeny injection container.

 * [src/service-factory.ts][22]

## Copyright

2026 Dominik Zogg

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-framework-skeleton
[2]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic
[3]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-config
[4]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-types
[5]: https://www.npmjs.com/package/@chubbyts/chubbyts-framework
[6]: https://www.npmjs.com/package/@chubbyts/chubbyts-framework-router-path-to-regexp
[7]: https://www.npmjs.com/package/@chubbyts/chubbyts-http-error
[8]: https://www.npmjs.com/package/@chubbyts/chubbyts-log-types
[9]: https://www.npmjs.com/package/@chubbyts/chubbyts-pino-adapter
[10]: https://www.npmjs.com/package/@chubbyts/chubbyts-undici-server
[11]: https://www.npmjs.com/package/@chubbyts/chubbyts-undici-server-node
[12]: https://www.npmjs.com/package/commander
[13]: https://www.npmjs.com/package/pino

[20]: src/command.ts
[21]: src/handler.ts
[22]: src/service-factory.ts
