import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

const PageNotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="shadow-lg max-w-md w-full">
        <CardHeader className="flex items-center justify-center pb-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Page Not Found
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            The page you are looking for does not exist.
          </p>
          <Button className="mt-6 w-full bg-red-500 hover:bg-red-600" onClick={handleGoHome}>
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageNotFound;
