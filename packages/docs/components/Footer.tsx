import { FaGithub } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';

export function Footer({ lang = 'zh-CN' }: { lang?: string }) {
  return (
    <footer className="py-3 mt-4 text-xs border-t border-fd-border text-fd-muted-foreground">
      <div className="flex flex-wrap gap-y-1 gap-x-4 justify-center items-center">
        <span>© 2024-present ikenxuan · GPL-3.0</span>
        <a
          href={`/${lang}/docs/guide/afdian`}
          className="flex gap-1 items-center transition-colors hover:text-fd-foreground"
        >
          <IoHeart className="text-danger-400 size-3" />
          <span>支持作者</span>
        </a>
        <a
          href="https://github.com/ikenxuan/karin-plugin-kkk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 items-center transition-colors hover:text-fd-foreground"
        >
          <FaGithub className="size-3" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}
