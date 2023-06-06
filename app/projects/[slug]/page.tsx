import { getProjectBySlug, getProjectsMetadata } from '@/lib';
import 'highlight.js/styles/atom-one-dark.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import * as React from 'react';

export const revalidate = 86400;

interface Props {
  params: IParams;
}

const PageRoute = async ({ params: { slug } }: Props) => {
  const project = await getProjectBySlug(`${slug}.mdx`);
  if (!project) notFound();

  const { meta, content } = project;

  return (
    <React.Fragment>
      <h1 className='mb-0 mt-4'>{meta.title}</h1>
      <div>{content}</div>
    </React.Fragment>
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
      publishedTime: new Date(project.meta.date).toISOString(),
      // add image
    },
    twitter: {
      title: project.meta.title,
      description: project.meta.description,
      // add image
    },
  } satisfies Metadata;
}
