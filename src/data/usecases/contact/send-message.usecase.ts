import { toast } from "../../../hooks";
import { IUsecase } from "../../../domain/usecases";

export interface SendMessageInput {
  name: string;
  email: string;
  message: string;
}

export class SendMessageUsecase implements IUsecase<SendMessageInput, void> {
  constructor() {}

  public async execute(_params: SendMessageInput): Promise<void> {
    toast({
      variant: "destructive",
      title: "Message not sent :(",
      description: "This feature is not available yet.",
    });
  }
}
