interface IUser {
  name: string;
}

type $ElementProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  as?: E;
};

type ElementProps<E extends React.ElementType<any>> = $ElementProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof $ElementProps<E>>;
