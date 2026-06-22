import "@testing-library/jest-dom/vitest";

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    this.callback?.([{ isIntersecting: true }]);
  }

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

class MockResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver;
globalThis.ResizeObserver = MockResizeObserver;
