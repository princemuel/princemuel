import { getProjectBySlug, getProjectsMetadata } from '@/lib';
import 'highlight.js/styles/atom-one-dark.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

interface Props {
  params: IParams;
}

const PageRoute = async ({ params: { slug } }: Props) => {
  const project = await getProjectBySlug(`${slug}.mdx`); //deduped!
  if (!project) notFound();

  const { meta, content } = project;

  return (
    <main className=''>
      <h1 className='mb-0 mt-4 text-900'>{meta.title}</h1>
      <div>{content}</div>
    </main>
  );
};

export default PageRoute;

export async function generateStaticParams() {
  const projects = await getProjectsMetadata();
  return (projects || []).map((project) => {
    return {
      slug: project.id,
    };
  });
}
export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const project = await getProjectBySlug(`${slug}.mdx`);
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested resource does not exist',
    };
  }

  return {
    title: project.meta.title,
    description: project.meta.description,
    authors: { name: 'Prince Muel', url: 'https://github.com/princemuel' },
    generator: 'Next.js',
    keywords: project.meta.tags,
    creator: 'Prince Muel',
    publisher: 'Prince Muel',
    openGraph: {
      type: 'article',
      title: project.meta.title,
      description: project.meta.description,
      authors: ['Prince Muel'],
      publishedTime: new Date(project.meta.date).toISOString(),
      // add image
    },
    twitter: {
      card: 'summary_large_image',
      site: '',
      creator: '@iamprincemuel',
      title: project.meta.title,
      description: project.meta.description,
      // add image
    },
  } satisfies Metadata;
}
