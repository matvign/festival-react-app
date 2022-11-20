import { RecordLabelBandFestivals } from "server/types";

export const recordLabelBandFixture: RecordLabelBandFestivals[] = [
  {
    bands: [
      {
        festivals: ["Omega Festival"],
        name: "Band X",
      },
      {
        festivals: [],
        name: "Band Y",
      },
    ],
    name: "Record Label 1",
  },
  {
    bands: [
      {
        festivals: ["Alpha Festival", "Beta Festival"],
        name: "Band A",
      },
    ],
    name: "Record Label 2",
  },
];
