import { rest } from "msw";
import { MusicFestivals } from "../server/types";

import { musicFestivals } from "./fixtures/musicFestivals";

export const handlers = [
  rest.get("https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals", (_req, res, ctx) => {
    return res(ctx.json<MusicFestivals[]>(musicFestivals));
  }),
];
