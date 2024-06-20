import { IUsecase } from "../usecases/usecases.interface";

export interface IUsecasesFactory {
  basket: IBasketFactory;
  menu: IMenuFactory;
  venue: IVenuesFactory;
  contact: IContactFactory;
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

export interface IContactFactory {
  makeSendMessageUsecase(): IUsecase;
}