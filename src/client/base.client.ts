import axios, { AxiosRequestConfig } from "axios";

export const enum HttpMethod {
  GET = "get",
}

export class RestClient {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  get<TResponse>(
    path: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
  ): Promise<TResponse> {
    const method = HttpMethod.GET;
    return this.sendRequest(method, path, params, headers);
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  private async sendRequest<TResponse, TRequest>(
    method: HttpMethod,
    path: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
  ): Promise<TResponse> {
    const url = `${this.baseUrl}/${path}`;
    const config: AxiosRequestConfig = RestClient.buildAxiosConfig<TRequest>(
      method,
      url,
      params,
      headers,
    );

    try {
      const response = await axios.request(config);
      return response ? response.data : null;
    } catch (err) {
      throw err;
    }
  }

  private static buildAxiosConfig<TRequest>(
    method: HttpMethod,
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
  ): AxiosRequestConfig {
    return {
      method,
      url,
      headers,
      params,
      timeout: 800,
    };
  }
}