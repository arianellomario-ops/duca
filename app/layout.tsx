import "./globals.css"; // aquí van tus variables y Tailwind
import { ReactNode } from "react";

export const metadata = {
  title: "DUCA",
  description: "Gestión contable simple y moderna",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" /*className="dark"*/>
      <body className="bg-bg text-text font-sans scroll-smooth">
        {children}
      </body>
    </html>
  );
}