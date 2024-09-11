import {
    LanguageModelV1,
    LanguageModelV1CallWarning,
    LanguageModelV1FinishReason,
    LanguageModelV1StreamPart,
  } from '@ai-sdk/provider';
  import {
    FetchFunction,
    ParseResult,
    combineHeaders,
    createEventSourceResponseHandler,
    createJsonResponseHandler,
    postJsonToApi,
    isParsableJson,
    generateId,
  } from '@ai-sdk/provider-utils';
  import { z } from 'zod';
  import { convertToCustomChatMessages } from './convert-to-custom-chat-messages';
  import { mapCustomFinishReason } from './map-custom-finish-reason';
  import {
    CustomChatModelId,
    CustomChatSettings,
  } from './custom-chat-settings';
  import { customFailedResponseHandler } from './custom-error';
  import { getResponseMetadata } from './get-response-metadata';
  
  type CustomChatConfig = {
    provider: string;
    baseURL: string;
    headers: () => Record<string, string | undefined>;
    fetch?: FetchFunction;
  };

interface Message {
  role?: string;
  content?: string;
  tool_calls?: ToolCall[];
}

interface ToolCall {
  index: number;
  id?: string;
  type?: string;
  function?: {
    name?: string;
    arguments?: string;
  };
}

  
  export class CustomChatLanguageModel implements LanguageModelV1 {
    readonly specificationVersion = 'v1';
    readonly defaultObjectGenerationMode = 'json';
  
    readonly modelId: CustomChatModelId;
    readonly settings: CustomChatSettings;
  
    private readonly config: CustomChatConfig;
  
    constructor(
      modelId: CustomChatModelId,
      settings: CustomChatSettings,
      config: CustomChatConfig,
    ) {
      this.modelId = modelId;
      this.settings = settings;
      this.config = config;
    }
  
    get provider(): string {
      return this.config.provider;
    }

    
  
    private getArgs({
      mode,
      prompt,
      maxTokens,
      temperature,
      topP,
      topK,
      frequencyPenalty,
      presencePenalty,
      stopSequences,
      responseFormat,
      seed,
    }: Parameters<LanguageModelV1['doGenerate']>[0]) {
      const type = mode.type;
  
      const warnings: LanguageModelV1CallWarning[] = [];
  
      if (topK != null) {
        warnings.push({
          type: 'unsupported-setting',
          setting: 'topK',
        });
      }
  
      if (frequencyPenalty != null) {
        warnings.push({
          type: 'unsupported-setting',
          setting: 'frequencyPenalty',
        });
      }
  
      if (presencePenalty != null) {
        warnings.push({
          type: 'unsupported-setting',
          setting: 'presencePenalty',
        });
      }
  
      if (stopSequences != null) {
        warnings.push({
          type: 'unsupported-setting',
          setting: 'stopSequences',
        });
      }
  
      if (
        responseFormat != null &&
        responseFormat.type === 'json' &&
        responseFormat.schema != null
      ) {
        warnings.push({
          type: 'unsupported-setting',
          setting: 'responseFormat',
          details: 'JSON response format schema is not supported',
        });
      }
  
      const baseArgs = {
        // model id:
        model: this.modelId,
  
        // model specific settings:
        safe_prompt: this.settings.safePrompt,
  
        // standardized settings:
        max_tokens: maxTokens,
        temperature: 0.01,
        top_p: topP,
        random_seed: seed,
  
        // response format:
        response_format:
          responseFormat?.type === 'json' ? { type: 'json_object' } : undefined,
  
        // messages:
        messages: convertToCustomChatMessages(prompt),
      };
  
      switch (type) {
        case 'regular': {
          return {
            args: { ...baseArgs, ...prepareToolsAndToolChoice(mode) },
            warnings,
          };
        }
  
        case 'object-json': {
          return {
            args: {
              ...baseArgs,
              response_format: { type: 'json_object' },
            },
            warnings,
          };
        }
  
        case 'object-tool': {
          return {
            args: {
              ...baseArgs,
              tool_choice: 'any',
              tools: [{ type: 'function', function: mode.tool }],
            },
            warnings,
          };
        }
  
        default: {
          const _exhaustiveCheck: never = type;
          throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
        }
      }
    }
  
    async doGenerate(
      options: Parameters<LanguageModelV1['doGenerate']>[0],
    ): Promise<Awaited<ReturnType<LanguageModelV1['doGenerate']>>> {
      const { args, warnings } = this.getArgs(options);
      console.log('args doGenerate 111: ' + JSON.stringify(args));
      //console.log(`${this.config.baseURL}/chat/completions`);

        const { responseHeaders, value: response } = await postJsonToApi({
          url: `${this.config.baseURL}/chat/completions`,
          headers: combineHeaders(this.config.headers(), options.headers),
          body: args,
          failedResponseHandler: customFailedResponseHandler,
          successfulResponseHandler: createJsonResponseHandler(
            customChatResponseSchema,
          ),
          abortSignal: options.abortSignal,
          fetch: this.config.fetch,
        });
      

      console.log(JSON.stringify(response));
  
      const { messages: rawPrompt, ...rawSettings } = args;
      const choice = response.choices[0];
      console.log(JSON.stringify(choice));

      console.log(JSON.stringify(choice.message.tool_calls));
      return {
        text: choice.message.content ?? undefined,
        toolCalls: choice.message.tool_calls?.map(toolCall => ({
          toolCallType: toolCall.type === 'function' ? 'function' : null,  // 检查是否是 'function'
          toolCallId: toolCall.id || '',  // 如果没有 id 则设置为空字符串
          toolName: toolCall.function?.name || '',  // 检查是否存在 function，获取 name
          args: toolCall.function?.arguments || '',  // 检查是否存在 arguments，获取其值
        })).filter(toolCall => toolCall.toolCallType !== null),  // 过滤掉非 'function' 类型的工具调用
        
        finishReason: mapCustomFinishReason(choice.finish_reason),
        usage: {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
        },
        rawCall: { rawPrompt, rawSettings },
        rawResponse: { headers: responseHeaders },
        warnings,
      };
    }
  

    async doStream(
      options: Parameters<LanguageModelV1['doStream']>[0],
    ): Promise<Awaited<ReturnType<LanguageModelV1['doStream']>>> {
      const { args, warnings } = this.getArgs(options);

      //console.log('args doStream 111: ' + JSON.stringify(args));


      const { responseHeaders, value: response } = await postJsonToApi({
        url: `${this.config.baseURL}/chat/completions`,
        headers: combineHeaders(this.config.headers(), options.headers),
        body: {
          ...args,
          stream: true,
        },
        failedResponseHandler: customFailedResponseHandler,
        successfulResponseHandler: createEventSourceResponseHandler(
          customChatChunkSchema,
        ),
        abortSignal: options.abortSignal,
        fetch: this.config.fetch,
      });


      console.log('args doStream 112: ' + JSON.stringify(response));
  
      const { messages: rawPrompt, ...rawSettings } = args;
  
      let finishReason: LanguageModelV1FinishReason = 'unknown';
      let usage: { promptTokens: number; completionTokens: number } = {
        promptTokens: Number.NaN,
        completionTokens: Number.NaN,
      };
  
      let isFirstChunk = true;

      const toolCalls: Array<{
        id: string;
        type: 'function';
        function: {
          name: string;
          arguments: string;
        };
      }> = [];
    const tool_call_stream = 
      {
        type: 'tool-call',
        toolCallType: 'function',
        toolCallId: '',
        toolName: '',
        args:''
      };
      const tool_call_stream_result = 
      {
        type: 'tool-result',
        toolCallType: 'function',
        toolCallId: '',
        toolName: '',
        result:''
      };

      let currentToolCall = null;

      return {
        stream: response.pipeThrough(
          new TransformStream<
            ParseResult<z.infer<typeof customChatChunkSchema>>,
            LanguageModelV1StreamPart
          >({
            transform(chunk, controller) {
              if (!chunk.success) {
                controller.enqueue({ type: 'error', error: chunk.error });
                return;
              }
  
              const value = chunk.value;
  
              if (value.usage != null) {
                usage = {
                  promptTokens: value.usage.prompt_tokens,
                  completionTokens: value.usage.completion_tokens,
                };
              }
  
              const choice = value.choices[0];
              console.log('args doStream 113 choice: ' + JSON.stringify(value.choices[0]));

              if (choice?.finish_reason != null) {
                finishReason = mapCustomFinishReason(choice.finish_reason);
              }

              console.log('finishReason: ' + finishReason);
  
              if (choice?.delta == null) {
                return;
              }
  
              const delta = choice.delta;
  
              if (delta.content != null) {
                controller.enqueue({
                  type: 'text-delta',
                  textDelta: delta.content,
                });
              }
              let functionName = '';
              let toolCallId = ''
              if (delta.tool_calls != null && delta.tool_calls.length > 0) {
                //for (const toolCall of delta.tool_calls) {
                  // custom tool calls come in one piece:
                  const toolCall = delta.tool_calls[0];
                  if (toolCall.type === 'function') {
                    functionName = toolCall.function.name;
                    toolCallId = toolCall?.id;
                    tool_call_stream.toolCallId = toolCall.id;
                    tool_call_stream.toolName = toolCall.function.name;
                    tool_call_stream.args = toolCall.function.arguments || '';
                    console.log('functionName: ' + functionName)
                  } else if(tool_call_stream.toolName !== '')
                  {
                    tool_call_stream.args += toolCall.function.arguments || '';
                    console.log('tool_call_stream.args: ' + tool_call_stream.args)
                  }
                //}
              }
              
              if (finishReason === 'tool_calls') {
                tool_call_stream_result.toolCallId = toolCallId; 
                tool_call_stream_result.toolName = functionName;
                tool_call_stream_result.result = tool_call_stream.args;

                controller.enqueue(tool_call_stream);
                controller.enqueue(tool_call_stream_result);

                console.log('tool_call_stream:' + JSON.stringify(tool_call_stream));
                console.log('tool_call_stream_result:' + JSON.stringify(tool_call_stream_result));
                
              }

            },

  
            flush(controller) {
              controller.enqueue({ type: 'finish', finishReason, usage });
            },
          }),
        ),
        rawCall: { rawPrompt, rawSettings },
        rawResponse: { headers: responseHeaders },
        warnings,
      };
    }
  }
  
  // limited version of the schema, focussed on what is needed for the implementation
  // this approach limits breakages when the API changes and increases efficiency
  const customChatResponseSchema = z.object({
    choices: z.array(
      z.object({
        message: z.object({
          role: z.literal('assistant'),
          content: z.string().nullable(),
          tool_calls: z
            .array(
              z.object({
                id: z.string(),
                function: z.object({ name: z.string(), arguments: z.string() }),
              }),
            )
            .nullish(),
        }),
        index: z.number(),
        finish_reason: z.string().nullish(),
      }),
    ),
    object: z.literal('chat.completion'),
    usage: z.object({
      prompt_tokens: z.number(),
      completion_tokens: z.number(),
    }),
  });
  
  // limited version of the schema, focussed on what is needed for the implementation
  // this approach limits breakages when the API changes and increases efficiency
  /* const customChatChunkSchema = z.object({
    object: z.literal('chat.completion.chunk'),
    choices: z.array(
      z.object({
        delta: z.object({
          role: z.enum(['assistant']).optional(),
          content: z.string().nullish(),
          tool_calls: z
            .array(
              z.object({
                id: z.string(),
                function: z.object({ name: z.string(), arguments: z.string() }),
              }),
            )
            .nullish(),
        }),
        finish_reason: z.string().nullish(),
        index: z.number(),
      }),
    ),
    usage: z
      .object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
      })
      .nullish(),
  });*/

  const customChatChunkSchema = z.object({
    id: z.string(),
    object: z.literal('chat.completion.chunk'),
    created: z.number(),
    model: z.string(),
    choices: z.array(
      z.object({
        index: z.number(),
        delta: z.object({
          role: z.enum(['assistant']).optional(),
          content: z.string().optional(),
          tool_calls: z.array(
            z.object({
              index: z.number(),
              id: z.string().optional(),
              type: z.literal('function').optional(),
              function: z.object({
                name: z.string().optional(),
                arguments: z.string().optional(),
              }),
            })
          ).optional(),
        }),
        finish_reason: z.string().nullable(),
      })
    ),
    system_fingerprint: z.string(),
  });
  
  function prepareToolsAndToolChoice(
    mode: Parameters<LanguageModelV1['doGenerate']>[0]['mode'] & {
      type: 'regular';
    },
  ) {
    // when the tools array is empty, change it to undefined to prevent errors:
    const tools = mode.tools?.length ? mode.tools : undefined;
  
    if (tools == null) {
      return { tools: undefined, tool_choice: undefined };
    }
  
    const mappedTools = tools.map(tool => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      },
    }));
  
    const toolChoice = mode.toolChoice;
  
    if (toolChoice == null) {
      return { tools: mappedTools, tool_choice: undefined };
    }
  
    const type = toolChoice.type;
  
    switch (type) {
      case 'auto':
      case 'none':
        return { tools: mappedTools, tool_choice: type };
      case 'required':
        return { tools: mappedTools, tool_choice: 'any' };
  
      // custom does not support tool mode directly,
      // so we filter the tools and force the tool choice through 'any'
      case 'tool':
        return {
          tools: mappedTools.filter(
            tool => tool.function.name === toolChoice.toolName,
          ),
          tool_choice: 'any',
        };
      default: {
        const _exhaustiveCheck: never = type;
        throw new Error(`Unsupported tool choice type: ${_exhaustiveCheck}`);
      }
    }
  }