import { Metadata } from 'next';

export const revalidate = 86400;

interface Props {
  params: {
    slug: string;
  };
}

async function Page({ params: { slug } }: Props) {
  return (
    <main className=''>
      <div></div>
    </main>
  );
}

export default Page;

// export async function generateStaticParams() {
//   const projects = await getProjectsMetadata();
//   return (projects || []).map((project) => {
//     return {
//       slug: project.id,
//     };
//   });
// }

export const metadata: Metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    type: 'article',
    publishedTime: new Date().toISOString(),
    authors: ['Prince Muel'],
  },
};

// export async function generateMetadata({
//   params: { slug },
// }: Props): Promise<Metadata> {
//   const project = await getProjectByName(`${slug}.mdx`);

//   if (!project) {
//     return {
//       title: 'Project Not Found',
//     };
//   }

//   return {
//     title: project.meta.title,
//   };
// }
