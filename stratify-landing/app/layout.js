import "./globals.css";

export const metadata = {
  title: "StatTrak - CS2 Performance Analytics",
  description:
    "AI-powered CS2 analytics platform. Contextual stats, micro aim analytics, decision intelligence, and personalized coaching.",
  keywords: "CS2, Counter-Strike, analytics, stats, aim, coaching, esports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
