import { IUsecase } from "../usecases/usecases.interface";

export interface IUsecasesFactory {
  basket: IBasketFactory;
  menu: IMenuFactory;
  venue: IVenuesFactory;
}

export interface IBasketFactory {
  makeAddToBasketUsecase(): IUsecase;
  makeGetBasketUsecase(): IUsecase;
  makeRemoveFromBasketUsecase(): IUsecase;
}

export interface IMenuFactory {
  makeGetMenuUsecase(): IUsecase;
}

export interface IVenuesFactory {
  makeGetVenueUsecase(): IUsecase;
}
