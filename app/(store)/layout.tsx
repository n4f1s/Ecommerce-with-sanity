import Header from "@/components/Header";
import "../../app/globals.css";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
}
