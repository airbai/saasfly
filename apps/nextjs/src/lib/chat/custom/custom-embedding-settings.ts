export type CustomEmbeddingModelId = 'custom-embed' | (string & {});

export interface CustomEmbeddingSettings {
  /**
Override the maximum number of embeddings per call.
   */
  maxEmbeddingsPerCall?: number;

  /**
Override the parallelism of embedding calls.
    */
  supportsParallelCalls?: boolean;
}