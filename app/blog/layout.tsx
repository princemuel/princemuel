export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id='main-content'
      aria-label='Blog Page'
      className='flex flex-col gap-20'
    >
      {children}
    </main>
  );
}
