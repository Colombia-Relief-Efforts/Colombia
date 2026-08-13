import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import AboutUs from "../about-us";

export default AboutUs;

export async function getStaticProps() {
  return {
    props: await serverSideTranslations("en", ["about-us", "common"]),
  };
}
