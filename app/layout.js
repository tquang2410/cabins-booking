import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import Header from "@/app/_components/Header";
import {Josefin_Sans} from "next/font/google";
const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
});
import '@/app/_styles/globals.css'
export const metadata = {
  title: {
    default: "The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
};
export default function RootLayout({children }) {
    return (
        <html lang="en">
        <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
       <Header/>
       <div className="flex-1 px-8 py-12">
        <main className="max-w-7xl mx-auto bg-red-500">{children}
        </main>
       </div>
        </body>
        </html>
    )
}