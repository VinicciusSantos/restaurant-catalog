import axios, { AxiosHeaders } from "axios";
import { HttpClient, HttpRequest, HttpResponse } from "../../domain/protocols";
import { toast } from "../../hooks";

export class AxiosHttpClient implements HttpClient<AxiosHeaders> {
  constructor() {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        toast({
          title: "Error",
          description: error.message,
        });
        return Promise.reject(error);
      }
    );
  }

  public async request<Request, Response>(
    data: HttpRequest<Request, AxiosHeaders>
  ): Promise<HttpResponse<Response>> {
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

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
