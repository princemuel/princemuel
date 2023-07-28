import {
  IconFacebook,
  IconGitHub,
  IconInstagram,
  IconLinkedIn,
  IconTwitter,
} from './assets';

// Making the Web better and accessible for everyone.

export const links: ILinks['routes'] = [
  {
    id: 'home',
    text: 'home',
    url: '/',
  },
  {
    id: 'projects',
    text: 'projects',
    url: '/projects',
  },
  {
    id: 'articles',
    text: 'articles',
    url: '/articles',
  },
  {
    id: 'resources',
    text: 'resources',
    url: '/resources',
  },
  {
    id: 'snippets',
    text: 'snippets',
    url: '/snippets',
  },
  {
    id: 'contact',
    text: 'contact me',
    url: '/contact',
  },
];

export const social: ILinks['social'] = [
  {
    id: 'icon-github',
    url: 'https://github.com/princemuel',
    icon: (props) => <IconGitHub {...props} />,
    alt: 'github',
  },
  {
    id: 'icon-linkedin',
    url: 'https://www.linkedin.com/in/princemuel',
    icon: (props) => <IconLinkedIn {...props} />,
    alt: 'linkedin',
  },
  {
    id: 'icon-twitter',
    url: 'https://www.twitter.com/iamprincemuel',
    icon: (props) => <IconTwitter {...props} />,
    alt: 'twitter',
  },
  {
    id: 'icon-instagram',
    url: 'https://www.instagram.com/princemuel',
    icon: (props) => <IconInstagram {...props} />,
    alt: 'instagram',
  },
  {
    id: 'icon-facebook',
    url: 'https://www.facebook.com/mikeychuks',
    icon: (props) => <IconFacebook {...props} />,
    alt: 'facebook',
  },
];

// type IconObject = 'chevron' | 'site';
// export const icons: Record<IconObject, Record<keyof any, IconRFCType>> = {}
