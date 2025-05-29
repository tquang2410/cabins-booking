import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import "@/app/_styles/globals.css";
export const metadata = {
    title: "The Wild Oasis",
    description: "A place to relax and enjoy nature",
};
export default function RootLayout({children }) {
    return (
        <html lang="en">
        <body className="!bg-primary-950 !text-primary-100 min-h-screen">
        <header>
            <Logo/>
            <Navigation/>
        </header>
        <main>{children}</main>
        <footer>Copy right by The Wild Oasis</footer>

        </body>
        </html>
    )
}