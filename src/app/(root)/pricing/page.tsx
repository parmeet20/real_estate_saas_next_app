import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 py-12 px-5">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200">Pricing Plans</h1>
        <p className="text-lg dark:text-gray-300 text-gray-500 mt-4">Choose the plan that suits you best</p>
      </div>
      <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* Free Plan */}
        <Card className="shadow-lg hover:bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Free</CardTitle>
            <CardDescription>Create up to 5 listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-muted-foreground">
              Perfect for individuals who are just getting started.
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✔️ Create up to 5 listings</li>
              <li>✔️ Basic support</li>
              <li>✔️ Access to community forum</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full mt-4">Get Started</Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="shadow-lg hover:bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Premium</CardTitle>
            <CardDescription>Create up to 50 listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-muted-foreground">
              Ideal for professionals and small businesses.
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✔️ Create up to 50 listings</li>
              <li>✔️ Priority support</li>
              <li>✔️ Access to premium features</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full mt-4">$50/month</Button>
          </CardFooter>
        </Card>

        {/* Custom Plan */}
        <Card className="shadow-lg hover:bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Custom</CardTitle>
            <CardDescription>Tailored to your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-muted-foreground">
              Best for large enterprises with specific requirements.
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✔️ Unlimited listings</li>
              <li>✔️ Dedicated account manager</li>
              <li>✔️ Custom integrations</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full mt-4">Contact Us</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
