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
import { CustomChatModelId, CustomChatSettings } from './custom-chat-settings';
import { CustomCompletionLanguageModel } from './custom-completion-language-model';
import {
  CustomCompletionModelId,
  CustomCompletionSettings,
} from './custom-completion-settings';
import { CustomEmbeddingModel } from './custom-embedding-model';
import {
  CustomEmbeddingModelId,
  CustomEmbeddingSettings,
} from './custom-embedding-settings';

export interface CustomProvider extends ProviderV1 {
  (
    modelId: 'moonshot-v1-8k',
    //modelId: 'gpt-3.5-turbo-instruct',
    settings?: CustomCompletionSettings,
  ): CustomCompletionLanguageModel;
  (modelId: CustomChatModelId, settings?: CustomChatSettings): LanguageModelV1;

  /**
Creates an Custom model for text generation.
   */
  languageModel(
    modelId: 'moonshot-v1-8k',
    //modelId: 'gpt-3.5-turbo-instruct',
    settings?: CustomCompletionSettings,
  ): CustomCompletionLanguageModel;
  languageModel(
    modelId: CustomChatModelId,
    settings?: CustomChatSettings,
  ): LanguageModelV1;

  /**
Creates an Custom chat model for text generation.
   */
  chat(
    modelId: CustomChatModelId,
    settings?: CustomChatSettings,
  ): LanguageModelV1;

  /**
Creates an Custom completion model for text generation.
   */
  completion(
    modelId: CustomCompletionModelId,
    settings?: CustomCompletionSettings,
  ): LanguageModelV1;

  /**
Creates a model for text embeddings.
   */
  embedding(
    modelId: CustomEmbeddingModelId,
    settings?: CustomEmbeddingSettings,
  ): EmbeddingModelV1<string>;

  /**
Creates a model for text embeddings.

@deprecated Use `textEmbeddingModel` instead.
   */
  textEmbedding(
    modelId: CustomEmbeddingModelId,
    settings?: CustomEmbeddingSettings,
  ): EmbeddingModelV1<string>;

  /**
Creates a model for text embeddings.
   */
  textEmbeddingModel(
    modelId: CustomEmbeddingModelId,
    settings?: CustomEmbeddingSettings,
  ): EmbeddingModelV1<string>;
}

export interface CustomProviderSettings {
  /**
Base URL for the Custom API calls.
     */
  baseURL?: string;

  /**
@deprecated Use `baseURL` instead.
     */
  baseUrl?: string;

  /**
API key for authenticating requests.
     */
  apiKey?: string;

  /**
Custom Organization.
     */
  organization?: string;

  /**
Custom project.
     */
  project?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  /**
Custom compatibility mode. Should be set to `strict` when using the Custom API,
and `compatible` when using 3rd party providers. In `compatible` mode, newer
information such as streamOptions are not being sent. Defaults to 'compatible'.
   */
  compatibility?: 'strict' | 'compatible';

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: FetchFunction;
}

/**
Create an Custom provider instance.
 */
export function createCustom(
  options: CustomProviderSettings = {},
): CustomProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
    'https://api.custom.com/v1';

  // we default to compatible, because strict breaks providers like Groq:
  const compatibility = options.compatibility ?? 'compatible';

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'Custom_API_KEY',
      description: 'Custom',
    })}`,
    'Custom-Organization': options.organization,
    'Custom-Project': options.project,
    ...options.headers,
  });

  const createChatModel = (
    modelId: CustomChatModelId,
    settings: CustomChatSettings = {},
  ) =>
    new CustomChatLanguageModel(modelId, settings, {
      provider: 'custom.chat',
      url: ({ path }) => `${baseURL}${path}`,
      headers: getHeaders,
      compatibility,
      fetch: options.fetch,
    });

  const createCompletionModel = (
    modelId: CustomCompletionModelId,
    settings: CustomCompletionSettings = {},
  ) =>
    new CustomCompletionLanguageModel(modelId, settings, {
      provider: 'custom.completion',
      url: ({ path }) => `${baseURL}${path}`,
      headers: getHeaders,
      compatibility,
      fetch: options.fetch,
    });

  const createEmbeddingModel = (
    modelId: CustomEmbeddingModelId,
    settings: CustomEmbeddingSettings = {},
  ) =>
    new CustomEmbeddingModel(modelId, settings, {
      provider: 'custom.embedding',
      url: ({ path }) => `${baseURL}${path}`,
      headers: getHeaders,
      fetch: options.fetch,
    });

  const createLanguageModel = (
    modelId: CustomChatModelId | CustomCompletionModelId,
    settings?: CustomChatSettings | CustomCompletionSettings,
  ) => {
    if (new.target) {
      throw new Error(
        'The Custom model function cannot be called with the new keyword.',
      );
    }

    //if (modelId === 'gpt-3.5-turbo-instruct') {
    if (modelId === 'moonshot-v1-8k') {
      return createCompletionModel(
        modelId,
        settings as CustomCompletionSettings,
      );
    }

    return createChatModel(modelId, settings as CustomChatSettings);
  };

  const provider = function (
    modelId: CustomChatModelId | CustomCompletionModelId,
    settings?: CustomChatSettings | CustomCompletionSettings,
  ) {
    return createLanguageModel(modelId, settings);
  };

  provider.languageModel = createLanguageModel;
  provider.chat = createChatModel;
  provider.completion = createCompletionModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;

  return provider as CustomProvider;
}

/**
Default Custom provider instance. It uses 'strict' compatibility mode.
 */
export const custom = createCustom({
  compatibility: 'strict', // strict for Custom API
});