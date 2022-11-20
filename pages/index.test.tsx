import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { GetServerSidePropsContext } from "next";

import Home, { getServerSideProps } from "./index";
import { recordLabelBandFixture } from "../mocks/fixtures/recordLabelList";

import { server } from "../mocks/server";

jest.mock("../components/RecordLabelList", () => {
  return {
    RecordLabelList: () => <div data-testid="RecordLabelListComponent" />,
  };
});

describe("Home page", () => {
  it("should render page with data", () => {
    render(<Home recordLabels={[]} />);

    expect(screen.getByTestId("RecordLabelListComponent")).toBeInTheDocument();
  });

  it("should render error if provided", () => {
    const error = { status: 429, message: "Too many requests, throttling" };
    render(<Home error={error} />);

    expect(screen.getByText("Error code: 429")).toBeInTheDocument();
    expect(screen.getByText("Too many requests, throttling")).toBeInTheDocument();
  });
});

describe("getServerSideProps", () => {
  it("should return data", async () => {
    const result = await getServerSideProps({} as GetServerSidePropsContext);

    expect(result).toEqual({ props: { recordLabels: recordLabelBandFixture } });
  });

  it("should return error when rate limited", async () => {
    server.use(
      rest.get("https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals", async (req, res, ctx) =>
        res(ctx.status(429), ctx.text("Too many requests, throttling"))
      )
    );

    const result = await getServerSideProps({} as GetServerSidePropsContext);
    expect(result).toEqual({ props: { error: { status: 429, message: "Too many requests, throttling" } } });
  });
});
