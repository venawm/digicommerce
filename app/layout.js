import "./globals.css";
// import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import TopNav from "@/components/TopNav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/utils/sessionProvider";

export const metadata = {
  title: "Digicommerce",
  description: "Digital ecommerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <TopNav />
          <Toaster position="top-center" />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
