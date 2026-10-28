import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Arzan.kg | Скидки, акции и купоны в Кыргызстане до 90%",
  description: "Лучшие скидки Бишкека и Кыргызстана: рестораны, SPA, аквапарки, кино, отели на Иссык-Куле и развлечения со скидкой до 90%.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen pb-20 md:pb-8">
              {children}
            </main>
            <BottomNav />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
