import "../../globals.css";

export const metadata = {
  title: "New Hope Children's Homes - Board of Directors",
  description: "Meet the people behind our mission",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
