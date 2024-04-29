import { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import BaseComponent from "@/components/base/BaseComponent";




export const metadata: Metadata = {
    title: "Threads",
    description: "Thread app",
} 

export default function HomeLayout({children}:{children:React.ReactNode}){
     return (
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem>
          <BaseComponent>
              {children}
          </BaseComponent>
        <Toaster/>
      </ThemeProvider>  
     )
}