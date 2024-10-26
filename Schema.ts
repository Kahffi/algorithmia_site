import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    fullName: z.string().min(3, {
      message: "Full name must be at least 3 characters",
    }),
    whatsapp: z.string(),
    passwordVerif: z.string().min(6, {
      message: "Confirm password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.passwordVerif, {
    path: ["passwordVerif"],
    message: "Confirm passwod does not match",
  });

export const SignInSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export type TSignUpSchema = z.infer<typeof SignUpSchema>;
export type TSignInScheama = z.infer<typeof SignInSchema>;
