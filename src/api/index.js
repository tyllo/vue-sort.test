import { BaseApi } from './BaseApi';

const baseApi = new BaseApi();

export const api = {
  getData(options) {
    const url = 'data';
    return baseApi.request(url, options);
  },
};
