import type { Metadata } from "next";
import { Dancing_Script, Caveat } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGate from "@/components/AuthGate";
import { SoundProvider } from "@/components/SoundToggle";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Ammu ❤️",
  description: "A special birthday surprise for Ammu Subiksha Barath",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${caveat.variable} antialiased`}
      >
        <AuthProvider>
          <SoundProvider>
            <ParticleBackground>
              <AuthGate>
                {children}
              </AuthGate>
            </ParticleBackground>
          </SoundProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
