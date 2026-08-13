import Head from 'next/head';
import Nav from './Nav/nav';
import { useTranslation } from 'next-i18next/pages';

export default function Layout({ children }) {
    const { i18n } = useTranslation();
    const siteTitle = i18n.resolvedLanguage === 'en' ? 'Help Colombia Now' : 'Ayuda a Colombia Ahora';

    return (
        <div className="m-6 sm:my-12 sm:mx-16">
            <Head><title>{siteTitle}</title></Head>
            <Nav />
            <main>{children}</main>
        </div>
    );
}
