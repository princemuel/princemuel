type Props = {
  name: string;
  email: string;
  message: string;
};

function EmailTemplate({ name, email, message }: Props) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
      <p>{message}</p>
    </div>
  );
}

export { EmailTemplate };
