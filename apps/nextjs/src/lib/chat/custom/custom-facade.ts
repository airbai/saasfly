import { loadApiKey, withoutTrailingSlash } from '@ai-sdk/provider-utils';
import { CustomChatLanguageModel } from './custom-chat-language-model';
import {
  CustomChatModelId,
  CustomChatSettings,
} from './custom-chat-settings';
import { CustomProviderSettings } from './custom-provider';

/**
 * @deprecated Use `createCustom` instead.
 */
export class Custom {
  /**
   * Base URL for the Custom API calls.
   */
  readonly baseURL: string;

  readonly apiKey?: string;

  readonly headers?: Record<string, string>;

  /**
   * Creates a new Custom provider instance.
   */
  constructor(options: CustomProviderSettings = {}) {
    this.baseURL =
      withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
      'https://api.moonshot.cn/v1'
      //'https://api.siliconflow.cn/v1';

    this.apiKey = options.apiKey;
    this.headers = options.headers;
  }

  private get baseConfig() {
    return {
      baseURL: this.baseURL,
      headers: () => ({
        Authorization: `Bearer ${loadApiKey({
          apiKey: this.apiKey,
          environmentVariableName: 'Custom_API_KEY',
          description: 'Custom',
        })}`,
        ...this.headers,
      }),
    };
  }

  chat(modelId: CustomChatModelId, settings: CustomChatSettings = {}) {
    return new CustomChatLanguageModel(modelId, settings, {
      provider: 'custom.chat',
      ...this.baseConfig,
    });
  }
}