export interface IUsecase<Input, Output> {
  execute(params?: Input): Promise<Output>;
}
