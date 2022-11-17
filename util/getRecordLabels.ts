import { MusicFestivals } from "../server/types";

type RecordLabel = Record<string, string[]>;
type RecordLabelByFestival = Record<string, RecordLabel>;

// convert festivals data into records label by festival data
export const getRecordLabels = (festivals: MusicFestivals[]) => {
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

  const sortedRecordLabelKeys = Object.keys(recordLabels).sort((a, b) => a.localeCompare(b));
  const sortedResult = sortedRecordLabelKeys.map((label) => {
    const recordLabel = recordLabels[label];
    const sortedBandKeys = Object.keys(recordLabel).sort((a, b) => a.localeCompare(b));

    const bands = sortedBandKeys.map((band) => {
      const festivals = recordLabels[label][band];
      const sortedFestivals = [...festivals].sort((a, b) => a.localeCompare(b));

      return { name: band, festivals: sortedFestivals };
    });

    return { name: label, bands };
  });

  return sortedResult;
};
