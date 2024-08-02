import { Inter } from "next/font/google";
import "./globals.css";
import MainNavigation from "@/components/navbar/MainNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "React Meetup",
  description: "Browse a huge list of highly active React meetups",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNavigation />
        <main style={{ margin: "3rem auto", width: "90%", maxWidth: "40rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
