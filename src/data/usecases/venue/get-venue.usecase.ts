import { Venue } from "src/domain/models";
import { HttpClient, HttpMethod } from "../../../domain/protocols";
import { IUsecase } from "src/domain/usecases";

export type GetVenueResponse = Venue | null;

export class GetVenueUsecase implements IUsecase<void, GetVenueResponse> {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public async execute(): Promise<GetVenueResponse> {
    const response = await this.httpClient.request<GetVenueResponse>({
      url: `${this.baseUrl}/venue/9`,
      method: HttpMethod.GET,
    });

    return response.body ?? null;
  }
}
