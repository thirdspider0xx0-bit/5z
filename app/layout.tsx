import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FIVE Launcher',
  description: 'Fair launches with FIVE in/FIVE back',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'FIVE Launcher',
    description: 'Join fair Solana token launches',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-solana-400 to-blue-400">
                FIVE
              </h1>
              <p className="text-gray-400 text-lg">Fair Launch Protocol</p>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {children}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
              <p>Built on Solana • Fair launches • FIVE in/FIVE back</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
