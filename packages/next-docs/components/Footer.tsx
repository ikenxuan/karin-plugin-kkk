import { FaGithub } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';

export function Footer() {
  return (
    <footer className="border-t border-fd-border py-3 mt-4 text-xs text-fd-muted-foreground">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>© 2024-present ikenxuan · GPL-3.0</span>
        <a
          href="/docs/guide/afdian"
          className="flex items-center gap-1 hover:text-fd-foreground transition-colors"
        >
          <IoHeart className="text-danger-400 size-3" />
          <span>支持作者</span>
        </a>
        <a
          href="https://github.com/ikenxuan/karin-plugin-kkk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-fd-foreground transition-colors"
        >
          <FaGithub className="size-3" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}
