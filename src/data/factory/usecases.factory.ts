import {
  IContactFactory,
  IMenuFactory,
  IUsecasesFactory,
  IVenuesFactory,
} from "../../domain/factory";

import { HttpClient } from "../../domain/protocols/http";
import { SendMessageUsecase } from "../usecases/contact";
import { GetMenuUsecase } from "../usecases/menu";
import { GetVenueUsecase } from "../usecases/venue";

export class UsecasesFactory implements IUsecasesFactory {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public get menu(): IMenuFactory {
    return {
      makeGetMenuUsecase: () =>
        new GetMenuUsecase(this.baseUrl, this.httpClient),
    };
  }

  public get venue(): IVenuesFactory {
    return {
      makeGetVenueUsecase: () =>
        new GetVenueUsecase(this.baseUrl, this.httpClient),
    };
  }

  public get contact(): IContactFactory {
    return {
      makeSendMessageUsecase: () => new SendMessageUsecase(),
    };
  }
}
