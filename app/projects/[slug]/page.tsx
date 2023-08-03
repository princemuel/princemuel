import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectsMetadata } from '../../content';

// export const revalidate = 86400;

interface Props {
  params: IParams;
}

const PageRoute = async ({ params: { slug } }: Props) => {
  const project = await getProjectBySlug(`${slug}.mdx`);
  if (!project) notFound();

  const { content } = project;

  return (
    <main
      id='main-content'
      aria-label={`${slug}`}
      className='prose prose-blue mx-auto flex flex-col gap-20 dark:prose-invert'
    >
      <div className='h-container'>{content}</div>
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
    keywords: project.meta.tags,
    openGraph: {
      type: 'article',
      title: project.meta.title,
      description: project.meta.description,
      authors: ['Prince Muel'],
      publishedTime: new Date(project.meta.publishedAt).toISOString(),
      images: project.meta.media?.thumbnail || '',
    },
    twitter: {
      title: project.meta.title,
      description: project.meta.description,
      images: project.meta.media?.thumbnail || '',
    },
  } satisfies Metadata;
}
