import { links } from '@/common';
import clsx from 'clsx';
import { Logo, NavLink, SocialIcon, Text } from '../atoms';
import styles from './styles.module.css';

interface Props {}

export function Footer(props: Props) {
  return (
    <footer className='mt-40 bg-zinc-800 full-width-shadow h-container'>
      <section className="relative py-32 text-white/75 before:absolute before:left-2/4 before:top-0 before:h-2 before:w-40 before:-translate-x-2/4 before:bg-teal-500 before:content-[''] before:md:left-0 before:md:translate-x-0">
        <div className='mb-12 flex flex-col items-center gap-12 text-center md:items-start md:text-left lg:flex-row lg:justify-between'>
          <Logo className='text-white transition-all delay-0 duration-300  ease-in hover:text-teal-500 focus:text-teal-500 active:text-teal-500' />

          <nav>
            <ul
              className='flex flex-col items-center gap-8 md:flex-row md:gap-14'
              aria-label='Secondary Navigation'
            >
              {links?.routes?.map((link) => (
                <li
                  key={link.text}
                  className='body-200 text-[1.4rem] uppercase text-white transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500'
                >
                  <NavLink href={link.url}>
                    <a>{link.text}</a>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={clsx('body-200 mt-12', styles['footer-grid'])}>
          <Text as='p' className={clsx('', styles.info)}>
            Hi there! Thanks for sticking with me till this point. If you're
            looking for a fast, performant, user-friendly, SEO and accessibility
            compliant website to represent your product or business, want a
            consultation or you'd just like to say hi 👋, please feel free to
            reach out. I will do my best to respond. 😊 The quickest way to
            reach me is via email.
          </Text>
          <Text as='p' className={clsx('', styles.copyright)}>
            Copyright &copy; {new Date().getFullYear()} Prince Muel. All Rights
            Reserved
          </Text>

          <ul
            className={clsx('flex items-center gap-6', styles.social)}
            aria-label='Social Links'
          >
            {links.social.map((link) => {
              return (
                <li
                  key={link.id}
                  className='text-white transition-all delay-0  duration-300 ease-in hover:text-teal-500 focus:text-teal-500'
                >
                  <SocialIcon className={'fill-current'} {...link} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </footer>
  );
}
