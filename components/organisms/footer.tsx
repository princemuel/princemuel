import { Logo } from '../atoms';

interface Props {}

export function Footer(props: Props) {
  return (
    <footer className='mt-40 bg-zinc-800 full-width-shadow h-container '>
      <section className="relative py-32 text-white/75 before:absolute before:left-2/4 before:top-0 before:h-2 before:w-40 before:-translate-x-2/4 before:bg-teal-500 before:content-[''] before:md:left-0 before:md:translate-x-0">
        <div className='mb-12 flex flex-col items-center gap-12 text-center md:items-start md:text-left lg:flex-row lg:justify-between'>
          <Logo className='text-white' />
        </div>
      </section>
    </footer>
  );
}
