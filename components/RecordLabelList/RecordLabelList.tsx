import { MusicFestivals, RecordLabelBandFestivals, BandFestivals } from "server/types";
import styles from "./RecordLabelList.module.css";

type RecordLabelListProps = {
  recordLabels?: RecordLabelBandFestivals[];
};

type RecordLabelBandsProps = {
  recordLabelName: string;
  bands: BandFestivals[];
};

export const RecordLabelBands = ({ recordLabelName, bands }: RecordLabelBandsProps) => {
  return (
    <ol aria-label={`Festival attendance from bands under ${recordLabelName}`}>
      {bands.map((band) => {
        const { name, festivals } = band;

        return (
          <li key={name} className={styles["list-style"]}>
            {name}
            <ol aria-label={`Festivals attended by ${name}`}>
              {festivals.map((festival) => {
                return (
                  <li key={festival} className={styles["list-style"]}>
                    {festival}
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
};

export const RecordLabelList = ({ recordLabels }: RecordLabelListProps) => {
  if (!recordLabels || !recordLabels.length) {
    return <p>No data found!</p>;
  }

  return (
    <ol aria-label="Band festival attendance by record label">
      {recordLabels.map((recordLabel) => {
        const { name, bands } = recordLabel;

        return (
          <li key={name} className={styles["list-style"]}>
            {name}
            <RecordLabelBands recordLabelName={name} bands={bands} />
          </li>
        );
      })}
    </ol>
  );
};
