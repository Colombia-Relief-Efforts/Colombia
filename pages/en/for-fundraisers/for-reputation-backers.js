import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import ForReputationBackers from "../../for-fundraisers/for-reputation-backers";

export default ForReputationBackers;

export async function getStaticProps() {
  return {
    props: await serverSideTranslations("en", ["for-reputation-backers", "common"]),
  };
}
