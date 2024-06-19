import { IUsecase } from "src/domain/usecases";

export class GetBasketUsecase implements IUsecase<void, void> {
  public async execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
