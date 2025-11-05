import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const {login, isLoggingIn} = useAuthStore();
    const validateForm = () => {
      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return false;
      }
      return true;
    }
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      await login(formData);
      console.log(formData);
    };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin"/>
                      Loggin in...
                    </>
                  ) : (  
                    "Login"
                  )}</Button>
                <Button variant="outline" type="button">
                  <a href="http://localhost:3000/api/auth/google" className="w-full">Login with Google</a> 
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/login" className="link link-primary">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
