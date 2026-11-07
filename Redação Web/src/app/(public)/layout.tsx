import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import '@/styles/site.css';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame">
      <SiteHeader />
      <div className="site-main">{children}</div>
      <SiteFooter />
    </div>
  );
}
