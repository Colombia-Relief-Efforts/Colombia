import Link from "../../components/LocalizedLink";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { useTranslation } from "next-i18next/pages";

import BlueInlineCallout from "../../components/blueInlineCallout";
import Button from "../../components/Button/button";
import Layout from "../../components/layout";
import ListItem from "../../components/List/listItem";
import Hero from "../../components/SubPage/Hero/hero";

export default function ForLargeOrganizations() {
  const { t } = useTranslation("for-large-organizations");

  return (
    <Layout>
      <div className="w-full pb-8 md:w-3/4 lg:w-2/3">
        <div className="mt-12 font-bold lg:pl-24">
          <Link href="/for-fundraisers">{"<"} {t("back")}</Link>
        </div>
        <Hero title={t("hero-title")} description={t("hero-description")} />
        <div className="absolute right-0 bg-gray-100 px-6 py-8 sm:mt-8 sm:px-16 lg:pl-40 lg:pr-96">
          <section className="mt-8">
            <h1 className="mb-4 text-2xl font-bold text-brandblue-default lg:text-4xl">
              {t("reasons-title")}
            </h1>
            <p className="font-bold">{t("reasons-intro")}</p>
            <ul>
              <ListItem>{t("reason-1")}</ListItem>
              <ListItem>{t("reason-2")}</ListItem>
              <ListItem>{t("reason-3")}</ListItem>
            </ul>
            <BlueInlineCallout>
              <p>{t("callout")}</p>
            </BlueInlineCallout>
          </section>

          <section>
            <h1 className="mb-4 mt-8 text-2xl font-bold text-brandblue-default lg:text-4xl">
              {t("featured-title")}
            </h1>
            <p>{t("featured-body")}</p>
            <div className="mt-4 w-full sm:w-64">
              <Button
                value={t("application")}
                href="https://forms.gle/k7X5SMjTBovUpfqFA"
                target="_blank"
              />
            </div>
          </section>

          <section>
            <h1 className="mb-4 mt-8 text-2xl font-bold text-brandblue-default lg:text-4xl">
              {t("improve-title")}
            </h1>
            <p>{t("improve-intro")}</p>
            <ul className="mt-4">
              <ListItem>
                <b>{t("item-1-title")}</b>
                <br /> {t("item-1-body")}
              </ListItem>
              <ListItem><b>{t("item-2")}</b></ListItem>
              <ListItem><b>{t("item-3")}</b></ListItem>
              <ListItem>
                <b>{t("item-4-title")}</b>
                <br />
                {t("item-4-body")}
              </ListItem>
              <ListItem>
                <b>{t("item-5-title")}</b>
                <br />
                {t("item-5-body")}
              </ListItem>
              <ListItem>
                <b>{t("item-6-title")}</b>
                <br />
                {t("item-6-body")}
              </ListItem>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale = "es" }) {
    return {
        props: {
      ...(await serverSideTranslations(locale, ["common", "for-large-organizations"])),
        },
    };
}
