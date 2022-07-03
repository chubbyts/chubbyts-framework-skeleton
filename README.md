# chubbyts-framework-skeleton

[![CI](https://github.com/chubbyts/chubbyts-framework-skeleton/workflows/CI/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-framework-skeleton/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-framework-skeleton/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-framework-skeleton?branch=master)
[![Infection MSI](https://badge.stryker-mutator.io/github.com/chubbyts/chubbyts-framework-skeleton/master)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-framework-skeleton/master)

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

 * node: 14
 * [@chubbyts/chubbyts-dic][2]: ^1.0.2
 * [@chubbyts/chubbyts-dic-config][3]: ^1.0.2
 * [@chubbyts/chubbyts-dic-types][4]: ^1.0.0
 * [@chubbyts/chubbyts-framework][5]: ^1.2.0
 * [@chubbyts/chubbyts-framework-router-path-to-regexp][6]: ^1.0.2
 * [@chubbyts/chubbyts-http][7]: ^1.0.0
 * [@chubbyts/chubbyts-http-types][8]: ^1.0.0
 * [@chubbyts/chubbyts-log-types][9]: ^1.0.0
 * [@chubbyts/chubbyts-pino-adapter][10]: ^1.0.0
 * [commander][11]: ^9.3.0
 * [pino][12]: ^7.11.0

## Installation

```sh
git clone https://github.com/chubbyts/chubbyts-framework-skeleton.git my-project
cd my-project
rm -rf .git
npm install
npm start
```

## Urls

* GET http://localhost:10080/ping
## Structure

### Command

Commands is code that is meant to be executed on command line.

 * [src/command.ts][13]

### Handler

Handler alias Controller, or Controller actions to be more precise.

 * [src/handler.ts][14]

### ServiceFactory

Service factories are the glue code of the dependeny injection container.

 * [src/service-factory.ts][15]

## Copyright

Dominik Zogg 2022

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-framework-skeleton
[2]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic
[3]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-config
[4]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-types
[5]: https://www.npmjs.com/package/@chubbyts/chubbyts-framework
[6]: https://www.npmjs.com/package/@chubbyts/chubbyts-framework-router-path-to-regexp
[7]: https://www.npmjs.com/package/@chubbyts/chubbyts-http
[8]: https://www.npmjs.com/package/@chubbyts/chubbyts-http-types
[9]: https://www.npmjs.com/package/@chubbyts/chubbyts-log-types
[10]: https://www.npmjs.com/package/@chubbyts/chubbyts-pino-adapter
[11]: https://www.npmjs.com/package/commander
[12]: https://www.npmjs.com/package/pino
[13]: src/command.ts
[14]: src/handler.ts
[15]: src/service-factory.ts
