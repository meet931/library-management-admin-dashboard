"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { loginSchema } from "@/schemas/loginSchema";
import { setCookie } from "@/utils/functions";
import IconService from "@/utils/icon";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SnackbarProvider, useSnackbar } from "notistack";

export function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async () => {        
        const adminData = {
          email: "admin@gmail.com",
          password: "Test@123",
        };
        try {
          if (
            values.email === adminData.email &&
            values.password === adminData.password
          ) {
            // Save admin data to cookies
            setCookie("adminData", JSON.stringify(adminData), 7); // Store for 7 days
            enqueueSnackbar("Login successfully", { variant: "success" });

            // Redirect to dashboard
            setTimeout(() => {
              router.push("/dashboard");
            }, 2000)
            return;
          } else {
            enqueueSnackbar("Invalid credentials", { variant: "error" });
            console.log("Invalid credentials");
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className=" flex justify-center">
            <Image
              src={IconService.logo_icon.src}
              alt="Logo"
              width={30}
              height={30}
            />
          </div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to Admin
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  labelName="Email Address"
                  labelClassName="text-sm font-medium"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  htmlFor="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Enter your email address"
                  errorMessage={
                    errors.email && touched.email ? errors.email : undefined
                  }
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  htmlFor="password"
                  labelName="Password"
                  labelClassName="text-sm font-medium"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Enter your password"
                  errorMessage={
                    errors.password && touched.password
                      ? errors.password
                      : undefined
                  }
                />
              </div>
            </div>

            <div>
              <Button
                buttonName="Sign In"
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function LoginSnack() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      <Login />
    </SnackbarProvider>
  );
}
