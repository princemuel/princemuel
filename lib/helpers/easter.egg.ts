import { reverse } from './helpers';

const welcome = [
  '********************',
  '*                  *',
  '*     WELCOME!     *',
];

const print = console.log;

export function easteregg() {
  for (const value of welcome) print(value);
  for (const value of [...reverse(welcome.slice(1))]) print(value);
}
