import React from "react";
import { render, screen, within } from "@testing-library/react";

import { RecordLabelList } from "./RecordLabelList";
import { recordLabelBandFixture } from "../../mocks/fixtures/recordLabelList";

describe("components/RecordLabelList", () => {
  it("should render", async () => {
    render(<RecordLabelList recordLabels={recordLabelBandFixture} />);

    expect(screen.queryByText("No data found!")).not.toBeInTheDocument();

    expect(
      screen.getByRole("list", { name: "Band festival attendance by record label" })
    ).toBeInTheDocument();

    const recordLabelLists = screen.getAllByRole("list", { name: /Festival attendance from bands under */ });
    expect(recordLabelLists).toHaveLength(2);
    expect(recordLabelLists[0]).toHaveAccessibleName("Festival attendance from bands under Record Label 1");
    expect(recordLabelLists[1]).toHaveAccessibleName("Festival attendance from bands under Record Label 2");

    const bands1 = within(recordLabelLists[0]).getAllByRole("list");
    expect(bands1).toHaveLength(2);
    expect(bands1[0]).toHaveAccessibleName("Festivals attended by Band X");
    expect(bands1[1]).toHaveAccessibleName("Festivals attended by Band Y");

    // band X under Record Label 1 attended Omega Festival
    expect(
      within(bands1[0])
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    ).toEqual(["Omega Festival"]);

    // band Y under Record Label 1 attended no festivals
    expect(within(bands1[1]).queryAllByRole("listitem")).toHaveLength(0);

    expect(
      within(recordLabelLists[1]).getByRole("list", { name: "Festivals attended by Band A" })
    ).toBeInTheDocument();

    const bands2 = within(recordLabelLists[1]).getByRole("list", { name: "Festivals attended by Band A" });
    expect(
      within(bands2)
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    ).toEqual(["Alpha Festival", "Beta Festival"]);
  });

  it("should render 'No data found' when record labels is empty", async () => {
    render(<RecordLabelList recordLabels={[]} />);

    expect(screen.getByText("No data found!")).toBeInTheDocument();
  });

  it("should render 'No data found' when record labels is undefined", async () => {
    render(<RecordLabelList />);

    expect(screen.getByText("No data found!")).toBeInTheDocument();
  });
});
