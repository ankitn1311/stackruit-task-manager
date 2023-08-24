import Head from "next/head";
// import { PageNotFoundTemplate } from "../components/templates/PageNotFoundTemplate";

export default function Custom404() {
  //* SEO Data for 404 Page
  const SEOData = {
    title: "Error 404",
    seoDescription: "404 Error Page",
    themeColor: "#EAD3AB",
  };

  return (
    <>
      {/* HEAD FOR SEO */}
      <Head>
        <title>{SEOData.title}</title>
        <meta name="description" content={SEOData.seoDescription} />
        <meta name="theme-color" content={SEOData.themeColor} />
      </Head>

      {/* 404 Style - Page Not Found */}
      {/* <PageNotFoundTemplate /> */}
      <div className="p-10">Page not found</div>
    </>
  );
}
