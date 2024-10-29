/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createCliPlugin } from '../../wiring/factory';
import yargs from 'yargs';

export default createCliPlugin({
  pluginId: 'config',
  init: async reg => {
    reg.addCommand({
      path: ['config:docs'],
      description: 'Browse the configuration reference documentation',
      execute: async ({ args }) => {
        await yargs
          .options({
            package: { type: 'string' },
          })
          .command(
            '$0',
            '',
            async () => {},
            async argv => {
              const m = await import('./commands/docs');
              await m.default(argv);
            },
          )
          .help()
          .parse(args);
      },
    });
    reg.addCommand({
      path: ['config', 'docs'],
      description: 'Browse the configuration reference documentation',
      execute: async ({ args }) => {
        await yargs
          .options({
            package: { type: 'string' },
          })
          .command(
            '$0',
            '',
            async () => {},
            async argv => {
              const m = await import('./commands/docs');
              await m.default(argv);
            },
          )
          .help()
          .parse(args);
      },
    });
    reg.addCommand({
      path: ['config:print'],
      description: 'Print the app configuration for the current package',
      execute: async ({ args }) => {
        await yargs
          .options({
            package: { type: 'string' },
            lax: { type: 'boolean' },
            frontend: { type: 'boolean' },
            'with-secrets': { type: 'boolean' },
            format: { type: 'string' },
            config: { type: 'string', array: true },
          })
          .command(
            '$0',
            '',
            async () => {},
            async argv => {
              const m = await import('./commands/print');
              await m.default(argv);
            },
          )
          .help()
          .parse(args);
      },
    });
    reg.addCommand({
      path: ['config:check'],
      description:
        'Validate that the given configuration loads and matches schema',
      execute: async ({ args }) => {
        await yargs
          .options({
            package: { type: 'string' },
            lax: { type: 'boolean' },
            frontend: { type: 'boolean' },
            deprecated: { type: 'boolean' },
            strict: { type: 'boolean' },
            config: { type: 'string', array: true },
          })
          .command(
            '$0',
            '',
            async () => {},
            async argv => {
              const m = await import('./commands/validate');
              await m.default(argv);
            },
          )
          .help()
          .parse(args);
      },
    });
  },
});
