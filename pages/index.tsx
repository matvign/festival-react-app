import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const server = "http://localhost:3000";

import { RecordLabelList } from "components/RecordLabelList/RecordLabelList";
import { Band, MusicFestivals } from "../server/types";

type PageProps = {
  festivals: MusicFestivals[];
};

export default function Home({ festivals }: PageProps) {
  return <RecordLabelList festivals={festivals} />;
}

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/v1/festivals`);
  const festivals = await res.json();

  return {
    props: {
      festivals,
    },
  };
}
