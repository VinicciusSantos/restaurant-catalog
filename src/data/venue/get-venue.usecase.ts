import { HttpClient, HttpMethod } from "../../domain/protocols";
import { Venue } from "./models";

export type GetVenueResponse = Venue | null;

export class GetVenueUsecase {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public async execute(): Promise<GetVenueResponse> {
    const response = await this.httpClient.request<GetVenueResponse>({
      url: this.baseUrl,
      method: HttpMethod.GET,
    });

    return response.body ?? null;
  }
}
