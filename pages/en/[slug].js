import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import OrganizationPage from "../[slug]";
import { getOrganization, getOrganizations } from "../../lib/markdown";

export default OrganizationPage;

export function getStaticPaths() {
  return {
    paths: getOrganizations().map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const organization = getOrganization(slug);

  if (!organization) return { notFound: true };

  return {
    props: {
      organization,
      ...(await serverSideTranslations("en", ["common"])),
    },
  };
}
