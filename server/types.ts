export type Band = {
  name: string;
  recordLabel: string;
};

export type MusicFestivals = {
  name: string;
  bands: Band[];
};

export type BandFestivals = {
  name: string;
  festivals: string[];
};

export type RecordLabelBandFestivals = {
  name: string;
  bands: BandFestivals[];
};
