import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'DeliverWing - Drone Delivery Operations', description: 'Autonomous drone delivery platform with order management and tracking' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body className="bg-gray-950 text-white antialiased min-h-screen">{children}</body></html>
}
