import { motion } from "framer-motion"; // Untuk animasi
import { useForm } from "react-hook-form";
import { SignInSchema, TSignInScheama } from "../../../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrbitProgress } from "react-loading-indicators";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

function LoginForm() {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext)!;
  const [isPending, setIsPending] = useState(false);

  const form = useForm<TSignInScheama>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: TSignInScheama) {
    try {
      setIsPending(true);
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
        dispatch({ type: "LOGIN", payload: data.user });
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      }
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
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-6 max-w-80 w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
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
            <FormItem className="w-full">
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

        {!isPending ? (
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            variant={"default"}
            size={"lg"}
            type="submit"
          >
            Masuk
          </Button>
        ) : (
          <OrbitProgress size="small" color={"#cc31b1"} />
        )}
      </motion.form>
    </Form>
  );
}

export default LoginForm;
