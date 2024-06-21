import { IUsecase } from "../usecases/usecases.interface";

export interface IUsecasesFactory {
  menu: IMenuFactory;
  venue: IVenuesFactory;
  contact: IContactFactory;
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