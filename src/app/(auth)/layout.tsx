export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen flex flex-row m-auto">{children}</div>;
}
