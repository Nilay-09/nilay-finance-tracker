"use client";

import "./globals.css";


import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContextProvider>
          <FinanceContextProvider>
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}