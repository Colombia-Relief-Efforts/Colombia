import { useEffect } from "react";
import { getOrganization, getOrganizations } from "../lib/markdown";
import { useRouter } from "next/router";
import OrgPage from "/components/OrgPage";
import Layout from "../components/layout";

export default function Home(props) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <div className="mt-8"></div>
      <OrgPage className="mt-4" orgData={props.data} showFrontPageLink={true}></OrgPage>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getOrganizations().map((organization) => ({
    params: { row: String(organization[organization.length - 1]) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { row } }) {
  const data = getOrganization(row);

  if (!data) {
    return { notFound: true, revalidate: 10 };
  }

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
