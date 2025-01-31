/**
 * @format
 */

import 'react-native';
import {it, jest} from '@jest/globals';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

// Note: import explicitly to use the types shipped with jest.

// Note: test renderer must be required after react-native.

// Mock the database initialization
jest.mock('../config/db/config/db.config', () => ({
  initializeDatabase: jest.fn(() => Promise.resolve()),
  sqliteDb: {
    executeSql: jest.fn(() => Promise.resolve([{rows: {item: jest.fn()}}])),
    transaction: jest.fn(),
  },
}));

it('renders correctly', async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toBeTruthy();
});
