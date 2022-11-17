import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const server = "http://localhost:3000";

import { RecordLabelList } from "components/RecordLabelList/RecordLabelList";
import { getRecordLabels } from "util/getRecordLabels";
import { Band, MusicFestivals, RecordLabelBandFestivals } from "../server/types";

type PageProps = {
  recordLabels: RecordLabelBandFestivals[];
};

export default function Home({ recordLabels }: PageProps) {
  return <RecordLabelList recordLabels={recordLabels} />;
}

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/v1/festivals`);
  const festivals = await res.json();

  const recordLabels = getRecordLabels(festivals);

  return {
    props: {
      recordLabels,
    },
  };
}
