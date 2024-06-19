import { IUsecase } from "src/domain/usecases";

export class RemoveFromBasketUsecase implements IUsecase<void, void> {
  public async execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
