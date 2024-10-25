import { motion } from "framer-motion"; // Untuk animasi
import { useForm } from "react-hook-form";
import { SignInSchema, TSignInScheama } from "../../../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { redirect } from "react-router-dom";

function LoginForm() {
  const form = useForm<TSignInScheama>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: TSignInScheama) {
    try {
      const res = await fetch("https://algoritmia.vercel.app/user/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
        mode: "cors",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();

      if (data.status === 200) {
        alert("login success");
      }
      console.log(data.message);
      if (data.status === 400) throw new Error("400");
    } catch (e) {
      if (!(e instanceof Error)) {
        console.error(e);
      }
      if ((e as Error).message.includes("400")) {
        form.setError("username", {
          message: "Nama Pengguna atau Kata Sandi salah, silahkan coba lagi",
        });
        form.setError("password", {
          message: "Nama Pengguna atau Kata Sandi salah, silahkan coba lagi",
        });
      }
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

export default LoginForm;
