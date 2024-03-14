import "./globals.css";
// import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";

import TopNav from "@/components/nav/TopNav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/utils/sessionProvider";
import { CategoryProvider } from "@/context/category";
import { TagProvider } from "@/context/tag";
import { ProductProvider } from "@/context/product";
import { CartProvider } from "@/context/cart";

export const metadata = {
  title: "Digicommerce",
  description: "Digital ecommerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <CategoryProvider>
          <TagProvider>
            <CartProvider>
              <ProductProvider>
                <body>
                  <TopNav />
                  <Toaster position="top-center" />
                  <div className="xsm:px-6 lg:px-10 mt-20">{children}</div>
                </body>
              </ProductProvider>
            </CartProvider>
          </TagProvider>
        </CategoryProvider>
      </SessionProvider>
    </html>
  );
}
