import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z.string(),
    password: z.string().min(6, {
      message: "Password setidaknya harus 6 karakter",
    }),
    fullName: z.string(),
    whatsapp: z.string(),
    passwordVerif: z.string().min(6, {
      message: "Konfirmasi kata sandi setidaknya harus 6 karakter",
    }),
  })
  .refine((data) => data.password === data.passwordVerif, {
    path: ["passwordVerif"],
    message: "Konfirmasi kata sandi tidak sesuai",
  });

export type TSignUpSchema = z.infer<typeof SignUpSchema>;
