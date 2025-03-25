import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../frontend/index.html"), "utf8");

describe("Recipe Finder App UI", () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it("should have an input field", () => {
    const input = document.querySelector("#ingredients");
    expect(input).not.toBeNull();
  });

  it("should have a button", () => {
    const button = document.querySelector("button");
    expect(button.textContent).toBe("Find Recipes");
  });
});
