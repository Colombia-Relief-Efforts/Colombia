import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import ForDonors from "../for-donors";

export default ForDonors;

export async function getStaticProps() {
  return {
    props: await serverSideTranslations("en", ["common", "for-donors"]),
  };
}
