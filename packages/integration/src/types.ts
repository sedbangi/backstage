/*
 * Copyright 2020 Spotify AB
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

import { Config } from '@backstage/config';
import { AzureIntegration } from './azure/AzureIntegration';
import { BitbucketIntegration } from './bitbucket/BitbucketIntegration';
import { GitHubIntegration } from './github/GitHubIntegration';
import { GitLabIntegration } from './gitlab/GitLabIntegration';

/**
 * Encapsulates a single SCM integration.
 */
export interface ScmIntegration {
  /**
   * The type of integration, e.g. "github".
   */
  type: string;

  /**
   * A human readable title for the integration, that can be shown to users to
   * differentiate between different integrations.
   */
  title: string;

  /**
   * Resolves an absolute or relative URL in relation to a base URL.
   *
   * This method is adapted for use within SCM systems, so relative URLs are
   * within the context of the root of the hierarchy pointed to by the base
   * URL.
   *
   * For example, if the base URL is  `<repo root url>/folder/a.yaml`, i.e.
   * within the file tree of a certain repo, an absolute path of `/b.yaml` does
   * not resolve to `https://hostname/b.yaml` but rather to
   * `<repo root url>/b.yaml` inside the file tree of that same repo.
   *
   * @param options.url The (absolute or relative) URL or path to resolve
   * @param options.base The base URL onto which this resolution happens
   */
  resolveUrl(options: { url: string; base: string }): string;
}

/**
 * Encapsulates several integrations, that are all of the same type.
 */
export interface ScmIntegrationsGroup<T extends ScmIntegration> {
  /**
   * Lists all registered integrations of this type.
   */
  list(): T[];

  /**
   * Fetches an integration of this type by URL.
   *
   * @param url A URL that matches a registered integration of this type
   */
  byUrl(url: string | URL): T | undefined;

  /**
   * Fetches an integration of this type by host name.
   *
   * @param url A host name that matches a registered integration of this type
   */
  byHost(host: string): T | undefined;
}

/**
 * Holds all registered SCM integrations, of all types.
 */
export interface ScmIntegrationRegistry
  extends ScmIntegrationsGroup<ScmIntegration> {
  azure: ScmIntegrationsGroup<AzureIntegration>;
  bitbucket: ScmIntegrationsGroup<BitbucketIntegration>;
  github: ScmIntegrationsGroup<GitHubIntegration>;
  gitlab: ScmIntegrationsGroup<GitLabIntegration>;

  /**
   * Resolves an absolute or relative URL in relation to a base URL.
   *
   * This method is adapted for use within SCM systems, so relative URLs are
   * within the context of the root of the hierarchy pointed to by the base
   * URL.
   *
   * For example, if the base URL is  `<repo root url>/folder/a.yaml`, i.e.
   * within the file tree of a certain repo, an absolute path of `/b.yaml` does
   * not resolve to `https://hostname/b.yaml` but rather to
   * `<repo root url>/b.yaml` inside the file tree of that same repo.
   *
   * @param options.url The (absolute or relative) URL or path to resolve
   * @param options.base The base URL onto which this resolution happens
   */
  resolveUrl(options: { url: string; base: string }): string;
}

export type ScmIntegrationsFactory<T extends ScmIntegration> = (options: {
  config: Config;
}) => ScmIntegrationsGroup<T>;
