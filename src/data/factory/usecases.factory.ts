import { HttpClient } from "../../domain/protocols/http";
import {
  IBasketFactory,
  IContactFactory,
  IMenuFactory,
  IUsecasesFactory,
  IVenuesFactory,
} from "src/domain/factory";
import {
  AddToBasketUsecase,
  GetBasketUsecase,
  RemoveFromBasketUsecase,
} from "../usecases/basket";
import { GetMenuUsecase } from "../usecases/menu";
import { GetVenueUsecase } from "../usecases/venue";
import { SendMessageUsecase } from "../usecases/contact";

export class UsecasesFactory implements IUsecasesFactory {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public get basket(): IBasketFactory {
    return {
      makeAddToBasketUsecase: () => new AddToBasketUsecase(),
      makeGetBasketUsecase: () => new GetBasketUsecase(),
      makeRemoveFromBasketUsecase: () => new RemoveFromBasketUsecase(),
    };
  }

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
