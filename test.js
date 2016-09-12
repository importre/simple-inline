import test from 'ava';
import inline from './';

test('simple case1', t => {
  const text = 'hello world';
  const expected = '<span class="bold strike">h</span>ello world';
  const styles = [{
    begin: 0,
    offset: 1,
    types: ['bold', 'strike']
  }];
  const result = inline(text, styles);
  t.is(result, expected);
});

test('simple case1 as object', t => {
  const text = 'hello world';
  const styles = [{
    begin: 0,
    offset: 1,
    types: ['bold', 'strike']
  }];
  const result = inline(text, styles, {
    returnType: 'object'
  });
  t.is(typeof result, 'object');
});

test('simple case2', t => {
  const text = 'hello world';
  const expected = '<span class="bold">h</span>ello worl<span class="italic">d</span>';
  const styles = [{
    begin: 0,
    offset: 1,
    types: ['bold']
  }, {
    begin: 10,
    offset: 1,
    types: ['italic']
  }];
  const result = inline(text, styles);
  t.is(result, expected);
});

test('complicated case', t => {
  const text = 'hello world';
  const expected = '<span class="underline">hell</span><span class="underline italic">o</span><span class="italic"> </span><span class="bold strike italic">w</span><span class="bold strike">orld</span>';
  const styles = [{
    begin: 0,
    offset: 5,
    types: ['underline']
  }, {
    begin: 6,
    offset: 5,
    types: ['bold', 'strike']
  }, {
    begin: 4,
    offset: 3,
    types: ['italic']
  }];
  const result = inline(text, styles);
  t.is(result, expected);
});

test('simple html entity', t => {
  const text = '<hello & world>';
  const expected = '&lt;hell<span class="bold">o &amp; w</span>orld&gt;';
  const styles = [{
    begin: 5,
    offset: 5,
    types: ['bold']
  }];
  const result = inline(text, styles);
  t.is(result, expected);
});

test('unicode', t => {
  const text = '한글';
  const expected = '<span class="a">한</span><span class="b">글</span>';
  const styles = [{
    begin: 0,
    offset: 1,
    types: ['a']
  }, {
    begin: 1,
    offset: 1,
    types: ['b']
  }];
  const result = inline(text, styles);
  t.is(result, expected);
});

