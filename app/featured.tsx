import { Button, Text } from '@/components';
import { cn, hasValues } from '@/lib';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Props {
  projects: IProjectMeta[];
}

function Featured({ projects }: Props) {
  if (!hasValues(projects))
    return (
      <Text as='h3' className='mt-10 text-center'>
        Sorry, no featured projects are available yet.
      </Text>
    );

  const featured = projects.filter((project) => project.featured);

  return (
    <>
      <ul
        className={cn('relative grid gap-10 grid-auto')}
        style={{ '--min-column-size': '30rem' } as CSSStyleProps}
      >
        {featured.map((project) => (
          <li
            key={project.id}
            className='group rounded-lg bg-slate-800 bg-opacity-10 text-slate-400 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] backdrop-blur-md backdrop-filter hover:text-teal-300'
          >
            <article className='flex flex-col gap-8 px-11 py-14'>
              <header className='flex flex-col gap-8'>
                <div className='flex items-center justify-between'>
                  <FolderPlusIcon className='aspect-square w-12 text-teal-300' />
                  <Button asChild>
                    <Link href={`/projects/${project.id}`} className='block'>
                      <ArrowTopRightOnSquareIcon
                        title='View Project Details'
                        className='aspect-square w-8 text-teal-300 hover:text-teal-300 focus:text-teal-300'
                      />
                    </Link>
                  </Button>
                </div>

                <Text as='h3' className='text-4xl group-hover:text-teal-300'>
                  {project.title}
                </Text>
              </header>

              <div>
                <Text as='p'>{project.description}</Text>
              </div>

              <footer>
                <ul className='flex flex-wrap items-center gap-4 font-mono text-lg'>
                  {project.tags.map((tag) => (
                    <li key={tag} className='text-slate-300'>
                      {tag}
                    </li>
                  ))}
                </ul>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

export { Featured };
