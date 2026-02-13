'use client';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';



export default function NotFound() {
 return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-1 ">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-blue-100 p-6 rounded-full">
            <Search className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* 404 Message */}
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-slate-900">
            404
          </h1>
          <p className="text-lg text-slate-600">
            Page not found
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed">
          " 🧠 Error detected. Fixing in progress. Please stand by while we pretend to know what we’re doing, lets rewind the tape "
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Link href="/" className="w-full">
            <Button variant="default" className="w-full">
              Return Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              Go Back
            </Button>
          </button>
        </div>
      </div>
    </main>
 );
}