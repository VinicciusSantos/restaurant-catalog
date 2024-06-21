import { Banner } from "@presentation/components";
import { Translator } from "@presentation/i18n";
import { IState } from "@presentation/store";
import { Button, Input, Textarea } from "@presentation/ui";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { usecasesFactory } from "../../../main";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const ContactUsPage: FunctionComponent = () => {
  const { venue } = useSelector((state: IState) => state.venue);
  const color = venue?.webSettings?.primaryColour || "#e63946";
  const addresses = [venue?.address1, venue?.address2, venue?.address3].filter(
    (address) => address
  );

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Banner />
      <main className="flex-1 bg-[#f5f5f5]">
        <section className="container px-4 md:px-6 py-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold mb-4" style={{ color }}>
                {venue?.name}
              </h1>
              {addresses.map((address, index) => (
                <div className="flex gap-4" key={address}>
                  <p className="text-lg font-bold text-[#333] mb-2">
                    {Translator({ path: "contactUs.address" })} {index + 1}:
                  </p>
                  <p className="text-lg text-[#333] mb-4">{address}</p>
                </div>
              ))}
            </div>
            <SendMessageForm />
          </div>
        </section>
      </main>
    </div>
  );
};

const SendMessageForm: FunctionComponent = () => {
  const { venue } = useSelector((state: IState) => state.venue);
  const color = venue?.webSettings?.primaryColour || "#e63946";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const sendMessage: SubmitHandler<FormValues> = async (data) => {
    const usecase = usecasesFactory.contact.makeSendMessageUsecase();
    await usecase.execute(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color }}>
        <Translator path="contactUs.get_in_touch" />
      </h2>
      <form className="grid gap-4" onSubmit={handleSubmit(sendMessage)}>
        <div>
          <Input
            type="text"
            placeholder={Translator({
              path: "contactUs.form.name_placeholder",
            })}
            {...register("name", { required: true })}
            className="px-4 py-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          />
          {errors.name && <p className="text-red-600">Name is required</p>}
        </div>
        <div>
          <Input
            type="email"
            placeholder={Translator({
              path: "contactUs.form.email_placeholder",
            })}
            {...register("email", { required: true })}
            className="px-4 py-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          />
          {errors.email && <p className="text-red-600">Email is required</p>}
        </div>
        <div>
          <Textarea
            placeholder={Translator({
              path: "contactUs.form.message_placeholder",
            })}
            {...register("message", { required: true })}
            className="px-4 py-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          />
          {errors.message && (
            <p className="text-red-600">Message is required</p>
          )}
        </div>
        <Button
          type="submit"
          className="text-white px-4 py-2 rounded-md"
          style={{ background: color }}
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};
