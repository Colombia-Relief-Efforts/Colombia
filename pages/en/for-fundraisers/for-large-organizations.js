import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import ForLargeOrganizations from "../../for-fundraisers/for-large-organizations";

export default ForLargeOrganizations;

export async function getStaticProps() {
  return {
    props: await serverSideTranslations("en", ["common", "for-large-organizations"]),
  };
}
