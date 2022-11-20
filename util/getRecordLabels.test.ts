import { getRecordLabels } from "./getRecordLabels";

import { musicFestivals } from "../mocks/fixtures/musicFestivals";
import { recordLabelBandFixture } from "mocks/fixtures/recordLabelList";
import { RecordLabelBandFestivals } from "server/types";

describe("getRecordLabels", () => {
  it("should convert festival data into sorted band data", () => {
    const result = getRecordLabels(musicFestivals);

    expect(result).toEqual(recordLabelBandFixture);
  });

  it("should return empty if there are no music festivals", () => {
    const result = getRecordLabels([]);

    expect(result).toEqual([]);
  });

  it("should return empty if input is not an array", () => {
    const result = getRecordLabels("");

    expect(result).toEqual([]);
  });
});
