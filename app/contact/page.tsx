import { ContactTemplate } from './contact';

export const metadata = {
  title: 'Contact Me',
  description: `If you're
  looking for a fast, performant, user-friendly, SEO and accessibility
  compliant website to represent your product or business, want a
  consultation or you'd just like to say hi 👋, please feel free to
  reach out. I'd love to hear about what you're working on and how I
  could help.`,
};

const PageRoute = () => {
  return (
    <main
      id='main-content'
      aria-label='Contact Page'
      className='flex flex-col gap-20'
    >
      <ContactTemplate />
    </main>
  );
};

export default PageRoute;
