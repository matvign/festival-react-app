// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { musicFestivals } from "../../../server/mocks/fixtures/musicFestivals";
import { MusicFestivals } from "../../../server/types";

export default function handler(req: NextApiRequest, res: NextApiResponse<MusicFestivals[]>) {
  res.status(200).json(musicFestivals);
}
