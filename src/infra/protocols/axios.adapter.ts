import axios, { AxiosHeaders } from "axios";

import { HttpClient, HttpRequest, HttpResponse } from "../../domain/protocols";


export class AxiosHttpClient implements HttpClient<AxiosHeaders> {
  public async request<Request, Response>(
    data: HttpRequest<Request, AxiosHeaders>
  ): Promise<HttpResponse<Response>> {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

    const axiosResponse = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers,
    });

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
