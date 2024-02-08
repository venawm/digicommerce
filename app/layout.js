import "./globals.css";
// import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";

import TopNav from "@/components/nav/TopNav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/utils/sessionProvider";
import { CategoryProvider } from "@/context/category";

export const metadata = {
  title: "Digicommerce",
  description: "Digital ecommerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <CategoryProvider>
          <body>
            <TopNav />
            <Toaster position="top-center" />
            <div className="xsm:px-6 lg:px-28">{children}</div>
          </body>
        </CategoryProvider>
      </SessionProvider>
    </html>
  );
}
