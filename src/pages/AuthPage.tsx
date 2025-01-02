import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-0 shadow-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold text-[#1A1F2C] dark:text-white">
            Log in
          </CardTitle>
          <p className="text-2xl text-muted-foreground">
            Log into your account
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsContent value="login">
              <LoginForm loading={loading} setLoading={setLoading} />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground flex gap-2">
                    Don't have an account?
                    <Link to="/auth?tab=register" className="text-[#9b87f5] hover:underline">
                      Sign up
                    </Link>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                    Forgot your password
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm loading={loading} setLoading={setLoading} />
              <div className="mt-4 text-sm text-muted-foreground flex gap-2">
                Already have an account?
                <Link to="/auth?tab=login" className="text-[#9b87f5] hover:underline">
                  Log in
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;