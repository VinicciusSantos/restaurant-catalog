import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { HttpClient, HttpRequest, HttpResponse } from "../../data/protocols";

export class AxiosHttpClient implements HttpClient<AxiosHeaders> {
  public async request<Request, Response>(data: HttpRequest<Request, AxiosHeaders>): Promise<HttpResponse<Response>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        axiosResponse = error.response!
      } else {
        throw error
      }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
