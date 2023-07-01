import { introduceMySelf } from "../src";

describe("introduceMyself", () => {
  it("should introduce me", () => {
    expect(introduceMySelf("D", "S")).toEqual("Hello D S");
  });
});
