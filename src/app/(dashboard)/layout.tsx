export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-h-screen">{children}</div>;
}
