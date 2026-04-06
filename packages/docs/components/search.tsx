'use client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  type SearchItemType,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { Chip, Kbd, Spinner } from '@heroui/react';
import { useEffect, useRef, useState, type CompositionEvent, type FocusEvent } from 'react';

const DefaultSearchDialog = (props: SharedProps) => {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    locale,
  });
  const resolvedLocale = locale ?? 'en';
  const isZhLocale = resolvedLocale.startsWith('zh');
  const isComposingRef = useRef(false);
  const [inputValue, setInputValue] = useState(search);
  const normalizeSearchValue = (value: string) => (isZhLocale ? value : value);
  const commitSearchValue = (value: string) => {
    setSearch(normalizeSearchValue(value));
  };
  useEffect(() => {
    if (!search.length) {
      setInputValue('');
      isComposingRef.current = false;
    }
  }, [search]);
  const handleSearchChange = (nextSearch: string) => {
    setInputValue(nextSearch);
    if (isComposingRef.current) return;
    commitSearchValue(nextSearch);
  };
  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };
  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    const nextSearch = event.currentTarget.value;
    setInputValue(nextSearch);
    commitSearchValue(nextSearch);
  };
  const handleInputBlur = (_event: FocusEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
  };
  const searchKeyword = inputValue.trim();
  const hasSearchKeyword = searchKeyword.length > 0;
  const searchItems = query.data !== 'empty' ? query.data : null;
  const statusText = query.isLoading
    ? isZhLocale
      ? '正在实时检索文档内容…'
      : 'Searching docs in real time...'
    : hasSearchKeyword
      ? isZhLocale
        ? `已输入「${searchKeyword}」，按 Enter 快速打开最佳匹配`
        : `Typed "${searchKeyword}", press Enter to open the top result`
      : isZhLocale
        ? '输入关键词开始搜索，支持标题、正文与路径'
        : 'Type to search titles, content, and paths';
  const renderEmpty = () => (
    <div className="px-4 py-7 text-sm text-fd-muted-foreground flex flex-col gap-2">
      <p className="font-medium text-fd-foreground">
        {hasSearchKeyword
          ? isZhLocale
            ? '没有找到匹配结果'
            : 'No matching results'
          : isZhLocale
            ? '开始输入即可搜索文档'
            : 'Start typing to search'}
      </p>
      <p>
        {hasSearchKeyword
          ? searchKeyword.length < 2
            ? isZhLocale
              ? '建议至少输入 2 个字符，可获得更稳定的结果'
              : 'Try at least 2 characters for better matching'
            : isZhLocale
              ? '可尝试平台名、功能名或英文关键词'
              : 'Try platform names, feature names, or synonyms'
          : isZhLocale
            ? '你可以搜索：抖音、B站、小红书、验证码等'
            : 'Examples: douyin, bilibili, xiaohongshu, captcha'}
      </p>
    </div>
  );
  const renderItem = ({ item, onClick }: { item: SearchItemType; onClick: () => void }) => (
    <div className="px-2 py-1">
      <SearchDialogListItem
        item={item}
        onClick={onClick}
        className="rounded-xl border border-transparent transition-colors hover:border-fd-border hover:bg-fd-accent/60"
      />
    </div>
  );

  return (
    <SearchDialog search={inputValue} onSearchChange={handleSearchChange} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay className="backdrop-blur-[2px]" />
      <SearchDialogContent className="border-fd-border/70 shadow-2xl">
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput
            placeholder={isZhLocale ? '搜索文档、功能与平台…' : 'Search docs, features, and platforms...'}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onBlur={handleInputBlur}
          />
          <SearchDialogClose />
        </SearchDialogHeader>
        <div className="px-3 pt-2 pb-1 flex flex-wrap items-center gap-2 border-b border-fd-border/60">
          <Chip size="sm" variant={query.isLoading ? 'secondary' : 'soft'} color={query.isLoading ? 'accent' : 'default'}>
            {statusText}
          </Chip>
          {query.isLoading && (
            <span className="inline-flex items-center gap-1 text-xs text-fd-muted-foreground">
              <Spinner size="sm" />
              {isZhLocale ? '检索中' : 'Searching'}
            </span>
          )}
        </div>
        <SearchDialogList items={searchItems} Empty={renderEmpty} Item={renderItem} />
        <SearchDialogFooter className="px-3 py-2 border-t border-fd-border/60 flex items-center gap-2 text-xs text-fd-muted-foreground">
          <Kbd>Enter</Kbd>
          <span>{isZhLocale ? '打开结果' : 'open'}</span>
          <Kbd>Esc</Kbd>
          <span>{isZhLocale ? '关闭' : 'close'}</span>
          <Kbd>↑↓</Kbd>
          <span>{isZhLocale ? '切换结果' : 'navigate'}</span>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
};

export default DefaultSearchDialog;
