import { motion } from "framer-motion"; // Untuk animasi
import { useForm } from "react-hook-form";
import { SignInSchema, TSignInScheama } from "Schema";
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
// const SignIn: React.FC = () => {
//   return (
//     <div
//       className="h-screen flex flex-col bg-cover bg-center"
//       style={{ backgroundImage: "url('path/to/your/background.jpg')" }}
//     >
//       {/* Sign In Form */}
//       <div className="flex flex-col items-center justify-center flex-grow bg-white bg-opacity-90 shadow-lg rounded-lg">
//         {/* Logo */}
//         <div className="mb-6">
//           <img alt="Algorithmia Logo" className="h-16" />
//         </div>

//         {/* Form */}
//         <motion.form
//           className="w-full max-w-sm"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
//             Sign In
//           </h1>
//           <div className="mb-4">
//             <input
//               className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
//               id="username"
//               type="text"
//               placeholder="Long Name"
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
//               id="password"
//               type="password"
//               placeholder="Password"
//             />
//           </div>
//           <div className="flex items-center justify-center">
//             <button
//               className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//             >
//               Sign In
//             </button>
//           </div>
//         </motion.form>

//         {/* Footer */}
//         <footer className="flex justify-between w-full max-w-sm mt-6 text-xs text-center text-gray-600">
//           <a
//             href="https://www.instagram.com/algorithmia.fest/"
//             className="text-pink-500 hover:underline"
//           >
//             Instagram: @Algorithmia.fest
//           </a>
//           <a
//             href="mailto:algorithmiafest@gmail.com"
//             className="text-blue-500 hover:underline"
//           >
//             Email: algorithmiafest@gmail.com
//           </a>
//         </footer>
//       </div>
//     </div>
//   );
// };

function SignInForm() {
  const form = useForm<TSignInScheama>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  async function onSubmit() {}

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

export default SignInForm;
