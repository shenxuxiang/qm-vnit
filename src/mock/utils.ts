/// <reference types="@types/node-fetch" />

import { http } from 'msw';
// import type { Request } from 'msw';
import type { HttpResponseResolver } from 'msw';

class MockHttp {
  public domain: string;
  constructor() {
    this.domain = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;
  }

  get(url: string, resolver: HttpResponseResolver) {
    return () => {
      return http.get(this.domain + url, resolver);
    };
  }

  post(url: string, resolver: HttpResponseResolver) {
    return () => {
      return http.post(this.domain + url, resolver);
    };
  }

  delete(url: string, resolver: HttpResponseResolver) {
    return () => {
      return http.delete(this.domain + url, resolver);
    };
  }

  put(url: string, resolver: HttpResponseResolver) {
    return () => {
      return http.put(this.domain + url, resolver);
    };
  }
}

export const mockHttp = new MockHttp();

/**
 * 将 text 转换成 arrayBuffer
 * @param text string
 * @returns
 */
export function readTextToArrayBuffer(text: string): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const read = new FileReader();
    const blob = new Blob([text], { type: 'text/plain' });

    read.onload = function () {
      resolve(this.result as ArrayBuffer);
    };
    read.readAsArrayBuffer(blob);
  });
}
