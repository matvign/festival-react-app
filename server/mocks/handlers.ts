import { rest } from "msw";
import { MusicFestivals } from "../types";

import { musicFestivals } from "./fixtures/musicFestivals";

export const handlers = [
  rest.get("https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals", (_req, res, ctx) => {
    return res(ctx.json<MusicFestivals[]>(musicFestivals));
  }),
];
