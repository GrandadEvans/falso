import { fake, FakeOptions } from './core/core';
import { randSequence } from './sequence';

export interface PasswordOptions extends FakeOptions {
  size?: number;
  special?: boolean;
}

/**
 * Generate a random password.
 *
 * @category person
 *
 * @example
 *
 * randPassword()
 *
 * @example
 *
 * randPassword({ length: 10 })
 *
 * @example
 *
 * randPassword({ size: 10 }) // default is 15
 *
 */
export function randPassword<Options extends PasswordOptions = never>(
  options?: Options
) {
  const size = options?.size || 15;
  let charType = 'alphaNumeric';
  if (options?.special) {
    charType = 'alphaNumWithSpecial';
  }

  return fake(() => randSequence({ size, charType }), options);
}
