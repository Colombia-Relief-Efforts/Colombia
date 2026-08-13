import Head from "next/head";
import { useRouter } from "next/router";
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
  const { locale } = useRouter();
  const metadata = METADATA[locale] || METADATA.es;

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      organizations: getOrganizations(),
    },
    revalidate: 10,
  };
}
