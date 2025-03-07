import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/header";
import Footer from "./component/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pet Forum Dashboard",
  description: "A community for pet lovers to share and connect.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
          {/* Header with Clerk Authentication */}
          <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <Header />
            <div className="flex gap-4">
              <SignedOut>
                <SignInButton className="px-4 py-2 bg-blue-500 text-white rounded-md" />
                <SignUpButton className="px-4 py-2 bg-green-500 text-white rounded-md" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg min-h-screen">
            {children}
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
