import { MusicFestivals } from "server/types";

export const musicFestivals: MusicFestivals[] = [
  {
    name: "Beta Festival",
    bands: [{ name: "Band A", recordLabel: "Record Label 2" }],
  },
  {
    name: "Omega Festival",
    bands: [{ name: "Band X", recordLabel: "Record Label 1" }],
  },
  { name: "Alpha Festival", bands: [{ name: "Band A", recordLabel: "Record Label 2" }] },
  { bands: [{ name: "Band Y", recordLabel: "Record Label 1" }] },
];
