import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <AuroraBackground>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </AuroraBackground>
  );
}
