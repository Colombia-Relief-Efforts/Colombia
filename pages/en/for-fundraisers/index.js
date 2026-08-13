import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import ForFundraisers from "../../for-fundraisers";
import { getPaymentMethods } from "../../../lib/markdown";

export default ForFundraisers;

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", ["for-fundraisers", "common"])),
      paymentMethods: getPaymentMethods(),
    },
  };
}
