import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Latests notes',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <Navbar />
        <div className={"lg:mx-3 lg:my-2 mx-1 my-1"}>
          {children}
        </div>
      </body>
    </html>
  )
}
