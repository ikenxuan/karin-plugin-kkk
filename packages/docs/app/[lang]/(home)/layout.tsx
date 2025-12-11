import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <AuroraBackground>
      <HomeLayout {...baseOptions(lang)}>{children}</HomeLayout>
    </AuroraBackground>
  );
}
