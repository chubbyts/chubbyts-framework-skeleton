import fetch from 'cross-fetch';
import { expect, test } from 'vitest';

test('ping', async () => {
  const response = await fetch(`${process.env.HTTP_URI}/ping`);

  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toBe('application/json');

  const responseData = await response.json();

  expect(responseData).toEqual({ datetime: expect.any(String) });

  const date = new Date(responseData.datetime);

  expect(!isNaN(date.valueOf())).toBe(true);
});
