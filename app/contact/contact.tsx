import layout from '@/assets/styles/layout.module.scss';
import { links } from '@/common';
import { SocialIcon, Text } from '@/components';
import { cn } from '@/lib';

interface Props {}

const ContactTemplate = (props: Props) => {
  return (
    <>
      <section className='flex flex-col gap-8 border-y border-zinc-800/20 py-12 h-container lg:flex-row'>
        <h2 className='flex-1'>Get in Touch</h2>

        <div className='flex flex-1 flex-col gap-6'>
          <Text className=''>
            I'd love to hear about what you're working on and how I could help.
            I'm currently looking for a new role and I'm open to a wide range of
            opportunities. My preference would be to work remotely... But I'd
            also be happy to hear about opportunites that don't fit that
            description. I'm a hard-working and positive person who will always
            approach each task with a sense of purpose and attention to detail.
            Please, do feel free to check out my online profiles below and get
            in touch using the form.
          </Text>

          <ul
            className={cn(
              'flex items-center gap-6 self-start',
              layout['footer__social']
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
      </section>

      <section className='flex flex-col gap-8 h-container lg:flex-row'>
        <h2 className='flex-1'>Contact Me</h2>

        <form className='> * + * leading-500 flex-1 space-y-12'>
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
      </section>
    </>
  );
};
export { ContactTemplate };
