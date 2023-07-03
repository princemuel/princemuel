import { cn } from '@/lib';
import { Featured } from '../components/organisms/featured';
im


const HomeTemplate = () => {
  return (
    <>
      <div>
        <div>
          <h1>
            <span>Hi there, </span>
            I'm
          </h1>
        </div>
        <div>{/* HERO  */}</div>
      </div>

      <section className={cn('h-container')}>
        <h2>About Me</h2>

        <Text as='p'>
          Hello! My name is Samuel. I'm a passionate technophile who loves
          building stuff with code and seeing them come alive as living products
          on the web.
        </Text>
        <Text as='p'>
          I've had an interest in computers for as long as I can remember, but
          first experience with programming was when in 2014 when I came across
          a Java textbook at a friend's place. It caught my interest and I was
          able to understand a bit of what was being explained but the rest
          remained inscrutable to me. I had other stuff going on at the time,
          especially my music, which made me put off learning it. (Also, the
          syntax was quite annoying 🤭)
        </Text>
        <Text as='p'>Years later,</Text>
        <Text as='p'> l</Text>
      </section>

      <section className={cn('h-container')}>
        <Text as='h2'>Featured Projects</Text>

        <Featured />
      </section>

      <section className={cn('h-container')}>
        {/* LETS BUILD SOMETHING TOGETHER */}
      </section>
    </>
  );
};

export { HomeTemplate };
