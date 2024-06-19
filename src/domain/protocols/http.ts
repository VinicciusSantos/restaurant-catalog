export interface HttpRequest<Body, Headers> {
  url: string;
  method: HttpMethod;
  body?: Body;
  headers?: Headers;
}

export interface HttpClient<Headers = unknown> {
  request<Response>(
    data: HttpRequest<Request, Headers>
  ): Promise<HttpResponse<Response>>;
}

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export enum HttpStatusCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body?: T;
}
