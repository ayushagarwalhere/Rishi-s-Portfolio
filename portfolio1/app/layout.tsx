import "./globals.css";
import Regular from "next/font/local";
import Poppins from "next/font/local";


const regular = Regular({
  src: "../public/fonts/regular.woff",
  variable: "--font-regular",
});

const poppins = Poppins({
  src: "../public/fonts/poppins.woff2",
  variable: "--font-poppins",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${regular.variable} ${poppins.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
