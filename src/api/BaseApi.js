export class BaseApi {
  baseUrl = '//5ef2c44225da2f0016228397.mockapi.io/api/v1'

  request(endpoint, options) {
    const url = `${this.baseUrl}/${endpoint}`;

    return fetch(url, options)
      .then((response) => response.json());
  }
}
