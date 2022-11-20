import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import axios, { AxiosError } from "axios";

import styles from "../styles/Home.module.css";

import { RecordLabelList } from "components/RecordLabelList";
import { getRecordLabels } from "util/getRecordLabels";
import { Band, MusicFestivals, RecordLabelBandFestivals } from "../server/types";

type PageProps = {
  recordLabels?: RecordLabelBandFestivals[];
  error?: {
    status: number;
    message: string;
  };
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const url = "https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals";

  try {
    const res = await axios.get(url);

    // api response is sometimes a string. Send empty response if so.
    const recordLabels = Array.isArray(res.data) ? getRecordLabels(res.data) : [];

    return {
      props: {
        recordLabels,
      },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // if axios error
      const status = err?.response?.status || 500;
      const statusText = err?.response?.statusText || "Internal Server Error";
      const message = err?.response?.data || statusText;

      return { props: { error: { status, message } } };
    } else {
      return { props: { error: { status: 500, message: "Internal Server Error" } } };
    }
  }
};

export default function Home({ recordLabels, error }: PageProps) {
  if (error) {
    return (
      <div>
        <p>Error code: {error.status}</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return <RecordLabelList recordLabels={recordLabels} />;
}
