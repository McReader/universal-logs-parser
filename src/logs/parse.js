import match from 'ramda/es/match';
import pipe from 'ramda/es/pipe';
import nth from 'ramda/es/nth';
import equals from 'ramda/es/equals';
import complement from 'ramda/es/complement';
import test from 'ramda/es/test';
import append from 'ramda/es/append';
import last from 'ramda/es/last';
import map from 'ramda/es/map';
import filter from 'ramda/es/filter';
import compose from 'ramda/es/compose';

export const extractParts = match(/^(\S+).+"(\w+) (.+) (.+)"/);
export const isGet = pipe(nth(2), equals('GET'));
export const isNonStatic = pipe(nth(3), complement(test(/\/static\//)));
export const appendHost = append('https://example.com');
export const toString = logParts => `${nth(1, logParts)} visited ${last(logParts)}${nth(3, logParts)}`;

const parse = compose(
  map(extractParts),
  filter(isGet),
  filter(isNonStatic),
  map(appendHost),
  map(toString),
);

export default parse;
