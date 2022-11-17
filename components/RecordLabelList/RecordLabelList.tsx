import { MusicFestivals } from "server/types";

type RecordLabelListProps = {
  festivals: MusicFestivals[];
};

type RecordLabel = Record<string, string[]>;
type RecordLabelByFestival = Record<string, RecordLabel>;

const getRecordLabels = (festivals: MusicFestivals[]) => {
  const recordLabels: RecordLabelByFestival = {};

  festivals.forEach((festival) => {
    const { name: festivalName, bands } = festival;

    bands.forEach((band) => {
      const { name: bandName, recordLabel } = band;

      if (recordLabel in recordLabels) {
        if (bandName in recordLabels[recordLabel]) {
          recordLabels[recordLabel][bandName].push(festivalName);
        } else {
          recordLabels[recordLabel][bandName] = [festivalName];
        }
      } else {
        recordLabels[recordLabel] = { [bandName]: [festivalName] };
      }
    });
  });

  return recordLabels;
};

const RecordLabel = ({ recordLabel }: { recordLabel: RecordLabel }) => {
  const sortedBandKeys = Object.keys(recordLabel).sort((a, b) => a.localeCompare(b));

  return (
    <div style={{ marginLeft: 8 }}>
      {sortedBandKeys.map((band) => {
        const festivals = recordLabel[band];
        const sortedFestivals = [...festivals].sort((a, b) => a.localeCompare(b));

        return (
          <div key={band} style={{ marginLeft: 8 }}>
            <h3>{band}</h3>
            <div style={{ marginLeft: 8 }}>
              {sortedFestivals.map((festival) => (
                <p key={festival}>{festival}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const RecordLabelList = ({ festivals }: RecordLabelListProps) => {
  const recordLabelsByFestival = getRecordLabels(festivals);
  const sortedRecordLabelKeys = Object.keys(recordLabelsByFestival).sort((a, b) => a.localeCompare(b));

  return (
    <div>
      {sortedRecordLabelKeys.map((label) => {
        const recordLabel = recordLabelsByFestival[label];

        return (
          <div key={label}>
            <h2>{label}</h2>
            <RecordLabel recordLabel={recordLabel} />
          </div>
        );
      })}
    </div>
  );
};
