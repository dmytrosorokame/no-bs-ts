import { setupServer } from "msw/node";
import { useCounter } from "./useCounter";

import { renderHook, act } from "@testing-library/react-hooks";
import { rest } from "msw";
import { useApi } from "./useApi";

const server = setupServer(
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ name: "Dmytro" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should increment", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useApi());

  await waitForNextUpdate();

  expect(result.current).toEqual({ name: "Dmytro" });
});
