import layout from '@/assets/styles/layout.module.scss';
import { links, social } from '@/common';
import { cn } from '@/lib';
import { Logo, NavLink, SocialIcon, Text } from '../atoms';

interface Props {}

export function Footer(props: Props) {
  return (
    <footer className='mt-40 bg-slate-950 text-slate-950 full-w-bg h-container'>
      <section className="relative py-32 text-white/75 before:absolute before:left-2/4 before:top-0 before:h-2 before:w-40 before:-translate-x-2/4 before:bg-teal-300 before:content-[''] before:md:left-0 before:md:translate-x-0">
        <div className='mb-12 flex flex-col items-center gap-12 text-center md:items-start md:text-left lg:flex-row lg:justify-between'>
          <Logo className='text-white transition-all delay-0 duration-300  ease-in hover:text-teal-300 focus:text-teal-300 active:text-teal-300' />

          <nav>
            <ul
              className='flex flex-col items-center gap-8 md:flex-row md:gap-14'
              aria-label='Secondary Navigation'
            >
              {links.map((link) => (
                <li
                  key={link.text}
                  className='text-xl uppercase text-white transition-all delay-0 duration-300 ease-in hover:text-teal-300 focus:text-teal-300'
                >
                  <NavLink href={link.url}>{link.text}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={cn(' mt-12', layout.footer)}>
          <Text as='p' className={cn('', layout['footer__info'])}>
            Hi there! Thanks for sticking with me till this point. If you're
            looking for a fast, performant, user-friendly, SEO and accessibility
            compliant website to represent your product or business, want a
            consultation or you'd just like to say hi 👋, please feel free to
            reach out. I will do my best to respond. 😊 The quickest way to
            reach me is via email.
          </Text>
          <Text as='p' className={cn('', layout['footer__copyright'])}>
            Copyright &copy; {new Date().getFullYear()} Prince Muel. All Rights
            Reserved
          </Text>

          <ul
            className={cn('flex items-center gap-6', layout['footer__social'])}
            aria-label='Social Links'
          >
            {social.map((social) => {
              return (
                <li
                  key={social.id}
                  className='text-white transition-all delay-0  duration-300 ease-in hover:text-teal-300 focus:text-teal-300'
                >
                  <SocialIcon className={'fill-current'} {...social} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </footer>
  );
}
