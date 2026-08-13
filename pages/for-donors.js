import Head from 'next/head'
import Layout from "../components/layout";
import OneFaq from "../components/SubPage/FAQ/OneFaq";
import Hero from "../components/SubPage/Hero/hero";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import Button from "../components/Button/button";
import ListItem from "../components/List/listItem";
import { useTranslation } from 'next-i18next/pages';

export default function ForDonors() {
    const { t } = useTranslation('for-donors');

    return (
      <Layout>
        <Head>
          <title>{t('title')}</title>
          <meta
            key="donors-description"
            name="donors-description"
            content={t('description')}
          />
          <meta
            key="donors-og:title"
            property="og:title"
            content={t('title')}
          />
          <meta
            key="donors-og:description"
            property="og:description"
            content={t('description')}
          />
          <meta
            key="donors-og:type"
            property="og:type"
            content="website"
          />
        </Head>
        <div className="w-full md:w-3/4 lg:w-2/3 pb-8">
          <Hero
            title={t('hero-title')}
            description={t('description')}
          />
          <p>{t('intro')}</p>
          <div className="bg-gray-100 absolute right-0 py-8 px-6 sm:px-16 sm:mt-8 lg:pl-40 lg:pr-96">
            <div className="mt-16">
              <h1 className="font-bold text-2xl lg:text-4xl mb-4 mt-8">
                {t('faq')}
              </h1>
              <OneFaq title={t('why-title')}>
                <p>{t('why-body')}</p>
              </OneFaq>
              <OneFaq title={t('vet-title')}>
                <ul className="list-disc ml-8">
                  <li>{t('vet-1')}</li>
                  <li>{t('vet-2')}</li>
                  <li>
                    {t('vet-3')} {" "}
                    <Link
                      href="/for-fundraisers/for-reputation-backers"
                      className="font-medium text-brandblue-default underline underline-offset-4 hover:text-brandblue-accent"
                    >
                      {t('vet-link')}
                    </Link>
                  </li>
                  <li>{t('vet-4')}</li>
                </ul>
                <ul>
                  <ListItem>
                    <strong>{t('disclaimer-label')} </strong>
                    {t('disclaimer')}
                  </ListItem>
                </ul>
              </OneFaq>
              <OneFaq title={t('how-title')}>
                <p>{t('how-body')}</p>
                <ul>
                  <ListItem>
                    <strong>{t('colombia-account')}</strong> {t('colombia-methods')}
                  </ListItem>
                  <ListItem>
                    <strong>{t('international-account')}</strong> {t('international-methods')}
                  </ListItem>
                </ul>
                <br />
                <div className="w-full sm:w-64">
                  <Button
                    value={t('see-all')}
                    href="/"
                    target="_blank"
                  />
                </div>
              </OneFaq>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'for-donors'])),
    },
  };
}
