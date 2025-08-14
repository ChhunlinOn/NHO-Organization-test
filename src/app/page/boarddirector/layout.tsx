import "../../globals.css" 
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "New Hope Children's Homes",
  description: "Meet the people behind our mission",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Optional Footer can go here */}
      </body>
    </html>
  )
}



