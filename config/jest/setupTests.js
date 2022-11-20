import "@testing-library/jest-dom";
import { server } from "../../mocks/server";

// setup msw to intercept requests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
