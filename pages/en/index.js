import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Home from "../index";
import { getOrganizations } from "../../lib/markdown";

export default Home;

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", ["common"])),
      organizations: getOrganizations(),
    },
  };
}
