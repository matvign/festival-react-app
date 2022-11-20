import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { RecordLabelList } from "components/RecordLabelList";
import { getRecordLabels } from "util/getRecordLabels";
import { Band, MusicFestivals, RecordLabelBandFestivals } from "../server/types";

type PageProps = {
  recordLabels?: RecordLabelBandFestivals[];
  error?: {
    code: number;
    message: string;
  };
};

export default function Home({ recordLabels, error }: PageProps) {
  if (error) {
    return (
      <div>
        <p>Error code: {error.code}</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return <RecordLabelList recordLabels={recordLabels} />;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const url = "https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      return { props: { error: { code: res.status, message: text } } };
    }

    const festivals = await res.json();

    // api response is sometimes an empty string
    const recordLabels = Array.isArray(festivals) ? getRecordLabels(festivals) : [];

    return {
      props: {
        recordLabels,
      },
    };
  } catch (err) {
    // return 500 for anything else
    return { props: { error: { code: 500, message: "Internal Server Error" } } };
  }
};
