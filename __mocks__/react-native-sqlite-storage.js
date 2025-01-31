export const enablePromise = jest.fn();
export const openDatabase = jest.fn(() =>
  Promise.resolve({
    executeSql: jest.fn(() => Promise.resolve([{rows: {item: jest.fn()}}])),
    transaction: jest.fn(),
  }),
);
