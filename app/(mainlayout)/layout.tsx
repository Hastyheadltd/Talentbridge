import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export const metadata = {
  title: "Flix Recruit",
  description: "Struggling to hire? Flix Recruit connects you with top talent fast. Flexible, scalable recruiting – no upfront costs. Get started today!",
  openGraph: {
    title: "Flix Recruit",
    description: "Struggling to hire? Flix Recruit connects you with top talent fast. Flexible, scalable recruiting – no upfront costs. Get started today!",
    url: "https://talent-bridge1.vercel.app",
    siteName: "Flix Recruit",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Flix Recruit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flix Recruit",
    description: "Struggling to hire? Flix Recruit connects you with top talent fast. Flexible, scalable recruiting – no upfront costs. Get started today!",
    image: " /logo.png", 
    creator: "Hasty Head Ltd", 
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
        <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}
