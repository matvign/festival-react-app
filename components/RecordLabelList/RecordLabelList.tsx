import { MusicFestivals, BandFestivals, RecordLabelBandFestivals } from "server/types";

type RecordLabelListProps = {
  recordLabels: RecordLabelBandFestivals[];
};

type RecordLabelBandsProps = {
  bands: BandFestivals[];
};

const RecordLabelBands = ({ bands }: RecordLabelBandsProps) => {
  return (
    <div style={{ marginLeft: 8 }}>
      {bands.map((band) => {
        const { name, festivals } = band;

        return (
          <div key={name} style={{ marginLeft: 8 }}>
            <h3>{name}</h3>
            <div style={{ marginLeft: 8 }}>
              {festivals.map((festivalName) => {
                return <p key={festivalName}>{festivalName}</p>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const RecordLabelList = ({ recordLabels }: RecordLabelListProps) => {
  return (
    <div>
      {recordLabels.map((recordLabel) => {
        const { name, bands } = recordLabel;

        return (
          <div key={name}>
            <h2>{name}</h2>
            <RecordLabelBands bands={bands} />
          </div>
        );
      })}
    </div>
  );
};
