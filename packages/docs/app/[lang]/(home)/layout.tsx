import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { getChangelog } from '@/lib/changelog';
import { ChangelogDropdown } from '@/components/changelog-dropdown';
import { KKKLogo } from '@/components/kkk-logo';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const changelogs = await getChangelog();
  const latestVersion = changelogs.v2.latest || 'v2.x.x';

  const homeOptions = baseOptions(lang);
  
  // Override nav to include latest version in ChangelogDropdown
  homeOptions.nav = {
    ...homeOptions.nav,
    title: <KKKLogo />,
    children: (
      <div className="flex gap-2 items-center ml-4">
        <ChangelogDropdown latestVersion={latestVersion} />
      </div>
    ),
  };

  return (
    <AuroraBackground>
      <HomeLayout {...homeOptions}>{children}</HomeLayout>
    </AuroraBackground>
  );
}
