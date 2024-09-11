import {
  EmbeddingModelV1,
  LanguageModelV1,
  ProviderV1,
} from '@ai-sdk/provider';
import {
  FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';
import { CustomChatLanguageModel } from './custom-chat-language-model';
import {
  CustomChatModelId,
  CustomChatSettings,
} from './custom-chat-settings';
import { CustomEmbeddingModel } from './custom-embedding-model';
import {
  CustomEmbeddingModelId,
  CustomEmbeddingSettings,
} from './custom-embedding-settings';

export interface CustomProvider extends ProviderV1 {
  (
    modelId: CustomChatModelId,
    settings?: CustomChatSettings,
  ): LanguageModelV1;

  /**
Creates a model for text generation.
*/
  languageModel(
    modelId: CustomChatModelId,
    settings?: CustomChatSettings,
  ): LanguageModelV1;

  /**
Creates a model for text generation.
*/
  chat(
    modelId: CustomChatModelId,
    settings?: CustomChatSettings,
  ): LanguageModelV1;

  /**
@deprecated Use `textEmbeddingModel()` instead.
   */
  embedding(
    modelId: CustomEmbeddingModelId,
    settings?: CustomEmbeddingSettings,
  ): EmbeddingModelV1<string>;

  /**
@deprecated Use `textEmbeddingModel()` instead.
   */
  textEmbedding(
    modelId: CustomEmbeddingModelId,
    settings?: CustomEmbeddingSettings,
  ): EmbeddingModelV1<string>;

  textEmbeddingModel: (
    modelId: CustomEmbeddingModelId,
    settings?: CustomEmbeddingSettings,
  ) => EmbeddingModelV1<string>;
}

export interface CustomProviderSettings {
  /**
Use a different URL prefix for API calls, e.g. to use proxy servers.
The default prefix is `https://api.custom.ai/v1`.
   */
  baseURL?: string;

  /**
@deprecated Use `baseURL` instead.
   */
  baseUrl?: string;

  /**
API key that is being send using the `Authorization` header.
It defaults to the `Custom_API_KEY` environment variable.
   */
  apiKey?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: FetchFunction;
}

/**
Create a Custom AI provider instance.
 */
export function createCustom(
  options: CustomProviderSettings = {},
): CustomProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
    'https://api.moonshot.cn/v1'
    //'https://api.siliconflow.cn/v1';

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'Custom_API_KEY',
      description: 'Custom',
    })}`,
    ...options.headers,
  });

  const createChatModel = (
    modelId: CustomChatModelId,
    settings: CustomChatSettings = {},
  ) =>
    new CustomChatLanguageModel(modelId, settings, {
      provider: 'custom.chat',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
    });

  const createEmbeddingModel = (
    modelId: CustomEmbeddingModelId,
    settings: CustomEmbeddingSettings = {},
  ) =>
    new CustomEmbeddingModel(modelId, settings, {
      provider: 'custom.embedding',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
    });

  const provider = function (
    modelId: CustomChatModelId,
    settings?: CustomChatSettings,
  ) {
    if (new.target) {
      throw new Error(
        'The Custom model function cannot be called with the new keyword.',
      );
    }

    return createChatModel(modelId, settings);
  };

  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;

  return provider as CustomProvider;
}

/**
Default Custom provider instance.
 */
export const custom = createCustom();