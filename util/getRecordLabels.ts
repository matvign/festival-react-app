import { MusicFestivals } from "../server/types";

type RecordLabel = Record<string, string[]>;
type RecordLabelByFestival = Record<string, RecordLabel>;

const sortRecordLabelData = (recordLabels: RecordLabelByFestival) => {
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

// convert festivals data into data containing record labels and their bands' festival attendance
export const getRecordLabels = (festivals: MusicFestivals[]) => {
  const recordLabels: RecordLabelByFestival = {};

  // abort early if not an array
  if (!Array.isArray(festivals)) {
    return sortRecordLabelData(recordLabels);
  }

  festivals.forEach((festival) => {
    const { name: festivalName, bands } = festival;

    // skip festivals that don't have valid bands
    if (!Array.isArray(bands) || !bands.length) return;

    bands.forEach((band) => {
      const { name: bandName, recordLabel } = band;

      // don't process band without name or record label
      if (!bandName || !recordLabel) return;

      // add recordLabel entry if it doesn't exist
      if (!(recordLabel in recordLabels)) {
        recordLabels[recordLabel] = {};
      }

      const bandInRecordLabel = bandName && bandName in recordLabels[recordLabel];

      if (festivalName && bandInRecordLabel) {
        // add festival into list of festivals band has attended
        recordLabels[recordLabel][bandName].push(festivalName);
      } else if (festivalName && !bandInRecordLabel) {
        // add new entry to record label with festival attended
        recordLabels[recordLabel][bandName] = [festivalName];
      } else {
        // no festival name, just add an empty array
        recordLabels[recordLabel][bandName] = [];
      }
    });
  });

  return sortRecordLabelData(recordLabels);
};
