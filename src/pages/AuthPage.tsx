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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 p-4 relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-[#9b87f5]/10 via-transparent to-transparent" />
      
      <Card className="w-full max-w-md border-0 shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold text-secondary-900">
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
                  <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-[#9b87f5] transition-colors">
                    Forgot your password?
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