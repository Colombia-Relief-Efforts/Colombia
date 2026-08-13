import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Layout from "../components/layout";
import OrgPage from "../components/OrgPage";
import { getOrganization, getOrganizations } from "../lib/markdown";

export default function OrganizationPage({ organization }) {
  return (
    <Layout>
      <div className="mt-8" />
      <OrgPage organization={organization} showFrontPageLink />
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: getOrganizations().map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug }, locale = "es" }) {
  const organization = getOrganization(slug);

  if (!organization) {
    return { notFound: true };
  }

  return {
    props: {
      organization,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
