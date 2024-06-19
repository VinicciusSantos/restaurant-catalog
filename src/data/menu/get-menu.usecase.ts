import { Menu } from "../../domain/models/menu.model";
import { HttpClient, HttpMethod } from "../../domain/protocols";
import { IUsecase } from "../../domain/usecases";

export type GetMenuResponse = Menu | null;

export class GetMenuUsecase implements IUsecase<void, GetMenuResponse> {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public async execute(): Promise<GetMenuResponse> {
    const response = await this.httpClient.request<GetMenuResponse>({
      url: this.baseUrl,
      method: HttpMethod.GET,
    });

    return response.body ?? null;
  }
}
