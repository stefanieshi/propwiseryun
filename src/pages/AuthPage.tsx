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
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#9b87f5] bg-clip-text text-transparent">
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
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm loading={loading} setLoading={setLoading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;