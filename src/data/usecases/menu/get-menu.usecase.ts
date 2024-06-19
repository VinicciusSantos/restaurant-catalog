import { Menu } from "src/domain/models";
import { HttpClient, HttpMethod } from "../../../domain/protocols";
import { IUsecase } from "src/domain/usecases";

export type GetMenuResponse = Menu | null;

export class GetMenuUsecase implements IUsecase<void, GetMenuResponse> {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public async execute(): Promise<GetMenuResponse> {
    const response = await this.httpClient.request<GetMenuResponse>({
      url: `${this.baseUrl}/menu`,
      method: HttpMethod.GET,
    });

    return response.body ?? null;
  }
}
