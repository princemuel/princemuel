import { links } from '@/common';
import clsx from 'clsx';
import { Heading, MainContent, Section, SocialIcon, Text } from '../atoms';
import footerStyles from '../organisms/styles.module.css';

interface Props {}

const ContactTemplate = (props: Props) => {
  return (
    <MainContent
      id='main-content'
      aria-label='Contact Page'
      className='flex flex-col gap-20'
    >
      <Section className='flex flex-col gap-8 border-y border-zinc-800/20 py-12 h-container lg:flex-row'>
        <Heading className='flex-1'>Get in Touch</Heading>

        <div className='flex flex-1 flex-col gap-6'>
          <Text className='body-200'>
            I'd love to hear about what you're working on and how I could help.
            I'm currently looking for a new role and am open to a wide range of
            opportunities. My preference would be to find work remotely. But I'm
            also happy to hear about opportunites that don't fit that
            description. I'm a hard-working and positive person who will always
            approach each task with a sense of purpose and attention to detail.
            Please do feel free to check out my online profiles below and get in
            touch using the form.
          </Text>

          <ul
            className={clsx(
              'flex items-center gap-6 self-start',
              footerStyles.social
            )}
            aria-label='Social Links'
          >
            {links.social.map((link) => {
              return (
                <li
                  key={link.id}
                  className='text-dark transition-all delay-0 duration-300  ease-in hover:text-teal-500 focus:text-teal-500 dark:text-white'
                >
                  <SocialIcon className={'fill-current'} {...link} />
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section className='flex flex-col gap-8 h-container lg:flex-row'>
        <Heading className='flex-1'>Contact Me</Heading>

        <form className='> * + * flex-1 space-y-12 text-[1.3rem] leading-500'>
          <div className='> * + * space-y-4'>
            <label className='block font-bold' htmlFor='name'>
              Name
            </label>
            <input
              type='text'
              className='w-full bg-zinc-800/20 px-6 py-4'
              id='name'
              placeholder='Jane Appleseed'
              autoComplete='name'
            />
          </div>

          <div className='> * + * space-y-4'>
            <label className='block font-bold' htmlFor='email'>
              Email Address
            </label>
            <input
              type='email'
              className='w-full bg-zinc-800/20 px-6 py-4'
              id='email'
              placeholder='email@example.com'
              autoComplete='email'
            />
          </div>

          <div className='> * + * space-y-4'>
            <label className='block font-bold' htmlFor='message'>
              Message
            </label>
            <textarea
              name=''
              className='min-h-[15rem] w-full bg-zinc-800/20 px-6 py-4'
              id='message'
              placeholder='How can I help'
            ></textarea>
          </div>

          <button type='submit' className='btn btn-primary'>
            Send Message
          </button>
        </form>
      </Section>
    </MainContent>
  );
};
export { ContactTemplate };
