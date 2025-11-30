import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'karin-plugin-kkk',
    },
    links: [
      {
        text: 'GitHub',
        url: 'https://github.com/ikenxuan/karin-plugin-kkk',
        external: true,
      },
    ],
  };
}
