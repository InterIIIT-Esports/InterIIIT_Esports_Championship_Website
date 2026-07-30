import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://esports.iiitiansnetwork.in"),
  title: {
    default: "IEC Esports | Inter IIIT Esports Championship by IIITians Network",
    template: "%s | IEC Esports",
  },
  description:
    "IEC Esports is the Inter IIIT Esports Championship organized by IIITians Network, bringing IIIT teams together for BGMI, Valorant, and Free Fire tournaments.",
  keywords: [
    "IEC Esports",
    "IEC Sport",
    "Inter IIIT Esports",
    "Inter IIIT Esports Championship",
    "IIITians Network event",
    "IIITians Network esports",
    "esports.iiitiansnetwork.in",
    "IIIT esports tournament",
    "Inter IIIT gaming",
    "BGMI IIIT tournament",
    "Valorant IIIT tournament",
    "Free Fire IIIT tournament",
  ],
  applicationName: "IEC Esports",
  authors: [{ name: "IIITians Network", url: "https://iiitiansnetwork.in" }],
  creator: "IIITians Network",
  publisher: "IIITians Network",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IEC Esports | Inter IIIT Esports Championship",
    description:
      "The official Inter IIIT Esports Championship website organized by IIITians Network.",
    url: "https://esports.iiitiansnetwork.in",
    siteName: "IEC Esports",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logos/IEC LOGO Black.png",
        width: 1200,
        height: 630,
        alt: "IEC Esports by IIITians Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEC Esports | Inter IIIT Esports Championship",
    description:
      "Official Inter IIIT Esports Championship organized by IIITians Network.",
    images: ["/logos/IEC LOGO Black.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://iiitiansnetwork.in/#organization",
      name: "IIITians Network",
      url: "https://iiitiansnetwork.in",
      logo: "https://esports.iiitiansnetwork.in/logos/iiitians-network.png",
      sameAs: [
        "https://www.instagram.com/iiitiansnetwork",
        "https://x.com/iiitiansnetwork",
        "https://www.youtube.com/c/IIITiansNetwork",
        "https://www.linkedin.com/company/53184003/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://esports.iiitiansnetwork.in/#website",
      name: "IEC Esports",
      alternateName: [
        "Inter IIIT Esports Championship",
        "IEC Sport",
        "IEC Inter IIIT Esports",
      ],
      url: "https://esports.iiitiansnetwork.in",
      publisher: {
        "@id": "https://iiitiansnetwork.in/#organization",
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "SportsEvent",
      "@id": "https://esports.iiitiansnetwork.in/#event",
      name: "Inter IIIT Esports Championship",
      alternateName: "IEC Esports",
      url: "https://esports.iiitiansnetwork.in",
      description:
        "IEC Esports is the Inter IIIT Esports Championship organized by IIITians Network for IIIT teams across India.",
      organizer: {
        "@id": "https://iiitiansnetwork.in/#organization",
      },
      sport: ["Esports", "BGMI", "Valorant", "Free Fire"],
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "VirtualLocation",
        url: "https://esports.iiitiansnetwork.in",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
