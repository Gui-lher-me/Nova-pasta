import { ConfirmationModalProvider } from "@/providers/confirmation-modal-provider";
import { SidebarToggleProvider } from "@/providers/sidebar-toggle-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title:
    "DropCommerce: Streamline Your Dropshipping with Real Brand Products Worldwide",
  description:
    "Dropship High Quality Products from Real Brands Located Across The World | DropCommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <NextTopLoader
          color="#32968e"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #32968e,0 0 5px #32968e"
          template={undefined}
          zIndex={1600}
          showAtBottom={false}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarToggleProvider>
            <ConfirmationModalProvider>{children}</ConfirmationModalProvider>
          </SidebarToggleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
