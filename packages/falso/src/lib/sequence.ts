import { fake, FakeOptions, Return } from './core/core';
import { random } from './random';

export const numericChars = '0123456789';
export const alphaChars = 'abcdefghijklmnopqrstuvwxyz';
export const specialChars = '<>@!#$%^&*()_+[]{}?:;|\'"\\,./~`-=';
export const numericAlphaChars = `${numericChars}${alphaChars}${alphaChars.toUpperCase()}`;

function generator(size = 8, chars = numericAlphaChars) {
  let result = '';

  for (let i = size; i > 0; --i)
    result += chars[Math.floor(random() * chars.length)];

  return result;
}

type RandomSequenceOptions = {
  size?: number;
  chars?: string;
  charType?: string;
} & FakeOptions;

type RandomSequenceOptions2 = {
  size?: number;
  charType?: 'numeric' | 'alpha' | 'alphaNumeric' | 'alphaNumWithSpecial' | 'special';
} & FakeOptions;

/**
 * Generate a random sequence.
 *
 * @category general
 *
 * @example
 *
 * randSequence()
 *
 * @example
 *
 * randSequence({ size: 10 })
 *
 * @example
 *
 * randSequence({ chars: 'aAbBcC@#' })
 *
 * @example
 *
 * randSequence({ charType: 'numeric' }) // numeric | alpha | alphaNumeric | special
 *
 * @example
 *
 * randSequence({ length: 10 })
 *
 */
export function randSequence<Options extends RandomSequenceOptions = never>(
  options?: RandomSequenceOptions
): Return<string, Options>;
export function randSequence<Options extends RandomSequenceOptions2 = never>(
  options?: RandomSequenceOptions2
): Return<string, Options>;
export function randSequence<
  Options extends RandomSequenceOptions & RandomSequenceOptions2 = never
>(options?: Options) {
  if (options?.charType && !options?.chars) {
    switch (options.charType) {
      case 'alpha':
        return fake(
          () =>
            generator(
              options?.size,
              `${alphaChars}${alphaChars.toUpperCase()}`
            ),
          options
        );
      case 'alphaNumeric':
        return fake(() => generator(options?.size, numericAlphaChars), options);
      case 'alphaNumWithSpecial':
        return fake(
            () =>
                generator(
                    options?.size,
                    `${alphaChars}${alphaChars.toUpperCase()}${specialChars}`
                ),
            options
        );
      case 'numeric':
        return fake(() => generator(options?.size, numericChars), options);
      case 'special':
        return fake(() => generator(options?.size, specialChars), options);
      default:
        return neverChecker(options.charType);
    }
  } else {
    return fake(() => generator(options?.size, options?.chars), options);
  }
}

function neverChecker(value: never) {
  throw new Error(`Invalid charType: ${value}`);
}
