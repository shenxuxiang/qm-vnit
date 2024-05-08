/* @vitest-environment jsdom */
import _axios from '../src/utils/axios';
import { describe, test, expect, vi } from "vitest";

describe('Test Axios', function() {
  test('Test Http Status 401', async function() {
    const axios = new (Object.getPrototypeOf(_axios).constructor)();
    const checkStatusMockFn = vi.fn(axios.checkStatus);
    axios.checkStatus = checkStatusMockFn;
    try {
      await axios.post('/test/status/401');
    } catch (error) {
      expect(error).toBeNull();
    }

    expect(checkStatusMockFn).toHaveBeenCalled();
    expect(checkStatusMockFn.mock.calls[0][0]).toBe(401);

    expect(document.location.href).toContain('/login');
  });

  test('Test Http Status 200 And Code 401', async function() {
    const axios = new (Object.getPrototypeOf(_axios).constructor)();
    const redirectionToLoginMockFn = vi.fn(axios.redirectionToLogin);
    axios.redirectionToLogin = redirectionToLoginMockFn;
    try {
      await axios.get('/test/code/401');
    } catch (error) {
      expect(error).toEqual({ code: 401 });
    }

    expect(redirectionToLoginMockFn).toHaveBeenCalled();
    expect(document.location.href).toContain('/login');
  });

  test('Test Http Status 200 And Code 0', async function() {
    const axios = new (Object.getPrototypeOf(_axios).constructor)();
    const errorCallbackMockFn = vi.fn();
    let resp: any = null;
    try {
      resp = await axios.get('/test/code/0');
    } catch (error) {
      errorCallbackMockFn(error);
    }

    expect(errorCallbackMockFn).not.toHaveBeenCalled();
    expect(resp).toEqual({ code: 0, data: true, message: '' });
  });

  test('Text Download File', async function() {
    const axios = new (Object.getPrototypeOf(_axios).constructor)();
    const errorCallbackMockFn = vi.fn();
    let resp: any = null;
    try {
      resp = await axios.getBlob('/test/download/file');
    } catch (error) {
      errorCallbackMockFn(error);
    }

    expect(errorCallbackMockFn).not.toHaveBeenCalled();

    expect(resp).not.toBeNull();
    expect(resp.fileName).toBe('__default_file');
  });
});
