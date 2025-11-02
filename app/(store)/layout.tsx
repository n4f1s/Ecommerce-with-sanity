import Header from "@/components/layout/Header";
import "../../app/globals.css";
import Footer from "@/components/layout/Footer";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
            {/* Content spacer so bottom bar doesn't overlap mobile pages */}
            <div className="sm:hidden h-20" />
        </main>
    );
}
