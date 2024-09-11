
export type CustomChatModelId =
  | 'moonshot-v1-8k'
  | 'deepseek-ai/DeepSeek-V2-Chat'
  | 'glm-4-flash'
  | 'moonshot-v1-8k'
  | 'open-mixtral-8x7b'
  | 'open-mixtral-8x22b'
  | 'open-custom-nemo'
  | 'custom-small-latest'
  | 'custom-medium-latest'
  | 'custom-large-latest'
  | (string & {});

export interface CustomChatSettings {
  /**
Whether to inject a safety prompt before all conversations.

Defaults to `false`.
   */
  safePrompt?: boolean;
}