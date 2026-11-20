import "./globals.css";
import {Hind_Siliguri} from "next/font/google";
import {Toaster} from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
const font=Hind_Siliguri({subsets:["bengali","latin"],weight:["400","600","700"]});
export const metadata={title:"বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",description:"বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও দাম বাড়া-কমার তথ্য।"};
export default function RootLayout({children}){
  return(<html lang="bn"><body className={font.className}><Toaster position="top-center"/><Navbar/><Ticker/><main className="min-h-[70vh]">{children}</main><Footer/></body></html>);
}
