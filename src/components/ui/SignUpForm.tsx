import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../../Schema";
import type { TSignUpSchema } from "../../../Schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SignUpForm() {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      password: "",
      username: "",
      whatsapp: "",
      passwordVerif: "",
    },
  });

  async function onSubmit(values: TSignUpSchema) {
    try {
      const res = await axios.post(
        "https://algoritmia.vercel.app/user/signup",
        JSON.stringify(values)
      );
      if (res.status !== 200) throw new Error("ba");
    } catch (e) {
      console.log("error lololo");

      console.error(e);
      // wait until BackEnd gave proper error status
      // form.setError("fullName", { message: "Nama lengkap anda tidak valid" });
      // form.setError("username", {
      //   message: "Nama pengguna ini sudah digunakan",
      // });
      // form.setError("whatsapp", {
      //   message: "Nomor Whatsapp yang anda masukkan tidak valid",
      // });
    }
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-80 w-full"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama Lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pengguna</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan nama pengguna" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata Sandi</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan kata sandi"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordVerif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Kata Sandi</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Konfirmasi kata sandi"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Whatsapp</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan nomor whatsapp"
                  type="text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          variant={"default"}
          size={"lg"}
          type="submit"
        >
          Daftar
        </Button>
      </motion.form>
    </Form>
  );
}
