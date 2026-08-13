import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import ForSmallFundraisers from "../../for-fundraisers/for-small-fundraisers";

export default ForSmallFundraisers;

export async function getStaticProps() {
  return {
    props: await serverSideTranslations("en", ["for-small-fundraisers", "common"]),
  };
}
