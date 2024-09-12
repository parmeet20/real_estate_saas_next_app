import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Lock } from 'lucide-react';
import { Button } from '../ui/button';

const AuthenticatedPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="shadow-lg max-w-md w-full">
        <CardHeader className="flex items-center justify-center pb-4">
          <Lock className="w-12 h-12" />
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            This Page is Authenticated
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Please login to view this page.
          </p>
          <Button className="mt-6 w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticatedPage;
