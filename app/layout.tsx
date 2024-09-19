import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

import { fontSans } from "@/lib/fonts";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              {children}
            </div>
          </div>
          {/* <TailwindIndicator />
            <ThemeSwitcher />
            <Analytics />
            <NewYorkToaster />
            <DefaultToaster />
            <NewYorkSonner /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
