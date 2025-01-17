import { SideBar } from '../../components/Siderbar/index';
import styles from './index.module.scss';
import { Aside } from '../../components/Aside/index';

import { DocFooter } from '../../components/DocFooter/index';
import { Content, usePageData } from 'island/client';
import { useLocaleSiteData } from '../../logic';

export function DocLayout() {
  const { toc: headers = [], siteData, pagePath, frontmatter } = usePageData();
  const themeConfig = siteData.themeConfig;
  const localesData = useLocaleSiteData();
  const sidebar = localesData.sidebar || [];
  // siderbar Priority
  // 1. frontmatter.sidebar
  // 2. themeConfig.locales.sidebar
  // 3. themeConfig.sidebar
  const hasSidebar =
    frontmatter?.sidebar !== false &&
    ((Array.isArray(sidebar) && sidebar.length > 0) ||
      Object.keys(sidebar).length > 0);
  const outlineTitle =
    localesData?.outlineTitle || themeConfig?.outlineTitle || 'ON THIS PAGE';
  const hasAside =
    headers.length > 0 &&
    themeConfig.outline !== false &&
    frontmatter?.outline !== false;

  return (
    <div p="t-0 x-6 b-24 sm:6">
      {hasSidebar ? <SideBar /> : null}
      <div flex="~ 1 shrink-0" m="x-auto" className={`${styles.content}`}>
        <div m="x-auto" flex="~ col">
          <div
            relative="~"
            m="x-auto"
            p="l-2"
            className={'md:max-w-712px lg:min-w-640px'}
            style={{
              maxWidth: hasAside ? '' : '1024px',
              paddingLeft: hasAside ? '0' : '72px'
            }}
          >
            <div className="island-doc">
              <Content fallback={<div>Loading...</div>} />
            </div>
            <DocFooter />
          </div>
        </div>
        <div
          relative="~"
          display="none lg:block"
          order="2"
          flex="1"
          p="l-8"
          className="max-w-256px"
        >
          <div className={styles.asideContainer}>
            <div
              flex="~ col"
              p="b-8"
              style={{
                minHeight:
                  'calc(100vh - (var(--island-nav-height-desktop) + 32px))'
              }}
            >
              {hasAside ? (
                <Aside
                  headers={headers}
                  outlineTitle={outlineTitle}
                  pagePath={pagePath}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
