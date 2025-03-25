import localFont from 'next/font/local'

export const departureMono = localFont({
  src: '../fonts/DepartureMono.otf',
  variable: '--font-departure-mono',
  display: 'swap',
  preload: true,
})