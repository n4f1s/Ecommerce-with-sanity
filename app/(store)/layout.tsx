import Header from "@/components/layout/Header";
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
