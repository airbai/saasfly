import { loadApiKey, withoutTrailingSlash } from '@ai-sdk/provider-utils';
import { CustomChatLanguageModel } from './custom-chat-language-model';
import { CustomChatModelId, CustomChatSettings } from './custom-chat-settings';
import { CustomCompletionLanguageModel } from './custom-completion-language-model';
import {
  CustomCompletionModelId,
  CustomCompletionSettings,
} from './custom-completion-settings';
import { CustomProviderSettings } from './custom-provider';

/**
@deprecated Use `createCustom` instead.
 */
export class Custom {
  /**
Use a different URL prefix for API calls, e.g. to use proxy servers.
The default prefix is `https://api.custom.com/v1`.
   */
  readonly baseURL: string;

  /**
API key that is being send using the `Authorization` header.
It defaults to the `OPENAI_API_KEY` environment variable.
 */
  readonly apiKey?: string;

  /**
Custom Organization.
   */
  readonly organization?: string;

  /**
Custom project.
   */
  readonly project?: string;

  /**
Custom headers to include in the requests.
   */
  readonly headers?: Record<string, string>;

  /**
   * Creates a new Custom provider instance.
   */
  constructor(options: CustomProviderSettings = {}) {
    this.baseURL =
      withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
      'https://api.custom.com/v1';
    this.apiKey = options.apiKey;
    this.organization = options.organization;
    this.project = options.project;
    this.headers = options.headers;
  }

  private get baseConfig() {
    return {
      organization: this.organization,
      baseURL: this.baseURL,
      headers: () => ({
        Authorization: `Bearer ${loadApiKey({
          apiKey: this.apiKey,
          environmentVariableName: 'Custom_API_KEY',
          description: 'Custom',
        })}`,
        'Custom-Organization': this.organization,
        'Custom-Project': this.project,
        ...this.headers,
      }),
    };
  }

  chat(modelId: CustomChatModelId, settings: CustomChatSettings = {}) {
    return new CustomChatLanguageModel(modelId, settings, {
      provider: 'custom.chat',
      ...this.baseConfig,
      compatibility: 'strict',
      url: ({ path }) => `${this.baseURL}${path}`,
    });
  }

  completion(
    modelId: CustomCompletionModelId,
    settings: CustomCompletionSettings = {},
  ) {
    return new CustomCompletionLanguageModel(modelId, settings, {
      provider: 'custom.completion',
      ...this.baseConfig,
      compatibility: 'strict',
      url: ({ path }) => `${this.baseURL}${path}`,
    });
  }
}