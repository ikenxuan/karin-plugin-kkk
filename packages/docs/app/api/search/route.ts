import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

type MandarinTokenizer = ReturnType<typeof createTokenizer>;
type TokenizeParams = Parameters<MandarinTokenizer['tokenize']>;
type TokenizeResult = ReturnType<MandarinTokenizer['tokenize']>;

const createCaseInsensitiveTokenizer = (): MandarinTokenizer => {
  const tokenizer = createTokenizer();
  const tokenize: MandarinTokenizer['tokenize'] = (...args: TokenizeParams): TokenizeResult =>
    tokenizer.tokenize(...args).map((token) => token.toLocaleLowerCase('en-US'));
  return {
    ...tokenizer,
    tokenize,
  };
};

export const { GET } = createFromSource(source, {
  localeMap: {
    'zh-CN': {
      components: {
        tokenizer: createCaseInsensitiveTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
    'zh-HK': {
      components: {
        tokenizer: createCaseInsensitiveTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
  },
});
