import Head from 'next/head';
import Nav from './Nav/nav';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
    const router = useRouter();
    const siteTitle = router.locale === 'en' ? 'Help Colombia Now' : 'Ayuda a Colombia Ahora';

    return (
        <div className="m-6 sm:my-12 sm:mx-16">
            <Head><title>{siteTitle}</title></Head>
            <Nav />
            <main>{children}</main>
        </div>
    );
}
