export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id='main-content' aria-label=''>
      {children}
    </main>
  );
}
