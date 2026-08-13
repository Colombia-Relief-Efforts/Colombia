import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import FundraiserDirectory from "../components/FundraiserDirectory";
import Hero from "../components/Hero/hero";
import Layout from "../components/layout";
import { getOrganizations } from "../lib/markdown";

const METADATA = {
  es: {
    title: "Ayuda a Colombia Ahora | Dona a recaudaciones comunitarias confiables",
    description:
      "Ayuda a Colombia Ahora conecta donantes con recaudaciones comunitarias confiables y organizaciones que brindan ayuda en Colombia.",
  },
  en: {
    title: "Help Colombia Now | Donate to trusted community fundraisers",
    description:
      "Help Colombia Now connects donors with trusted community fundraisers and organizations providing aid across Colombia.",
  },
};

export default function Home({ organizations }) {
  const { i18n } = useTranslation();
  const metadata = METADATA[i18n.resolvedLanguage] || METADATA.es;

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Hero />
      <FundraiserDirectory organizations={organizations} />
    </Layout>
  );
}

export async function getStaticProps({ locale = "es" }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      organizations: getOrganizations(),
    },
  };
}
