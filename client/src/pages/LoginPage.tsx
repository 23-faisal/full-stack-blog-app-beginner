import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define form schema with validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

//  Infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  //  Use `useForm` with `zodResolver`
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // ✅ Added `isSubmitting`
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  //  Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log("Login Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      
      {/*  Form starts */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Email Input */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} className="mt-1 w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/*  Password Input */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} className="mt-1 w-full" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/*  Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
