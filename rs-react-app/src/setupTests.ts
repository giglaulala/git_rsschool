// src/setupTests.ts
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// Start the mock server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
