// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IUsecase<Input = any, Output = any> {
  execute(params?: Input): Promise<Output>;
}
