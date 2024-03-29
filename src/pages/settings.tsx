import { NextPage } from "next";
import Head from "next/head";

import { SettingsView } from "@/views";
import { DefaultLayout } from "@/layouts";

const SettingsPage: NextPage = () => {
  return (
    <DefaultLayout fullScreen title="Settings">
      <Head>
        <title>Swipe and Matching now.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <SettingsView />
    </DefaultLayout>
  );
};

export default SettingsPage;
