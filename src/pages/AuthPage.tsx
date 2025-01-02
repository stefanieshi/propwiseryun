import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Link, useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-900/80 p-4 relative">
      {/* Background with property image and overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/40b689a6-12a5-4e9d-9f98-61dac7376731.png")',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-futuristic backdrop-blur-sm" />
      </div>

      {/* Content */}
      <Card className="w-full max-w-md border-0 shadow-none bg-secondary-900/80 backdrop-blur-sm relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold text-[#40E0D0]">
            {defaultTab === "login" ? "Log in" : "Sign up"}
          </CardTitle>
          <p className="text-2xl text-muted-foreground">
            {defaultTab === "login" ? "Log into your account" : "Create your account"}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm loading={loading} setLoading={setLoading} />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground flex gap-2">
                    Don't have an account?
                    <Link to="/auth?tab=register" className="text-[#40E0D0] hover:text-[#20B2AA]">
                      Sign up
                    </Link>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-[#40E0D0]">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm loading={loading} setLoading={setLoading} />
              <div className="mt-4 text-sm text-muted-foreground flex gap-2">
                Already have an account?
                <Link to="/auth?tab=login" className="text-[#40E0D0] hover:text-[#20B2AA]">
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