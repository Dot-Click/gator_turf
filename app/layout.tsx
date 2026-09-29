import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import "./inner.css";
import "./redesign.css";
export const metadata: Metadata = { title: { default: "Gator Turf | Beautiful outdoors. Effortlessly.", template: "%s | Gator Turf" }, description: "Premium artificial turf for Florida living. Explore landscaping, putting greens, pet turf, playgrounds and ivy walls with Gator Turf.", icons: { icon: "/assets/favicon.png" } };
export default function RootLayout({children}: {children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
