import { FeatherChrome, FeatherFlame } from "@subframe/core";
import { Button } from "../../../ui/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

const SignIn = () => {

 const userValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be 8 characters")
 })

 type userLogin = z.infer<typeof userValidation>

 const formData = useForm<userLogin>({
  resolver: zodResolver(userValidation),
  defaultValues: {
    email: "",
    password: "",
  }
 })


 const onSubmit = (data: z.infer<userLogin>) => {

 }
  return (
    <>
      <div className="bg-black h-screen flex flex-col justify-center place-items-center">
        <div className="bg-white grid grid-rows-3 h-[70%] rounded-2xl place-items-center text-center w-[30%]">
          {/* Title Header*/}
          <div className="flex flex-row items-center gap-x-2 pb-15">
            <FeatherFlame className="bg-[#e9590c] font-body text-white p-2 rounded-md" />
            <h1 className="text-2xl font-bold">PyroSense</h1>
          </div>
          {/* Welcome Header */}
          <div className="flex flex-col pb-[70%]">
            <h2 className="text-xl font-bold">Welcome back</h2>
            <p>Sign in to your wildfire intelligence dashboard</p>
          </div>
          {/* Google Directory Header */}
          <div className="flex flex-col pb-[105%] gap-y-5">
            <Button className="border-2 border-[#a19f9f] p-4 w-sm h-md cursor-pointer hover:bg-[#605d5d] hover:text-white transition-all duration-300 hover:scale-105">
              <FeatherChrome/>
              Continue with Google
            </Button>
            <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
            <span className = "text-caption font-caption text-subtext-color text-md">              
              or
            </span>
            <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />

          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
