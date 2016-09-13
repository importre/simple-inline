'use strict';

const union = require('lodash.union');
const escape = require('lodash.escape');

const getPoints = styles => {
  return styles
    .map(s => ({
      begin: s.begin,
      end: s.begin + s.offset,
      types: s.types
    }))
    .reduce((points, s) => union(points, [s.begin, s.end]), [])
    .sort((a, b) => a - b);
};

const getSegments = (styles, points) => {
  return points.filter((_, i) => i + 1 < points.length)
    .map((begin, i) => {
      const end = points[i + 1];
      const types = styles
        .filter(s => s.begin <= begin && end <= s.begin + s.offset)
        .map(s => s.types)
        .reduce((prev, curr) => prev.concat(curr), []);
      return {
        begin,
        end,
        types
      };
    });
};

const genHtml = (segments, text) => {
  if (segments.length === 0) {
    return escape(text);
  }

  return segments.reverse()
    .reduce((text, segment) => {
      const types = segment.types.join(' ').trim();
      if (types === '') {
        return escape(text);
      }
      const a = text.substring(0, segment.begin);
      const b = text.substring(segment.begin, segment.end);
      const c = text.substring(segment.end);
      return escape(`${a}{{span class=#${types}#}}${b}{{/span}}${c}`);
    }, text)
    .replace(/{{span class=#([^#]+)#}}(.+?){{\/span}}/g, (m, g1, g2) => {
      return `<span class="${g1}">${g2}<\/span>`;
    });
};

module.exports = (text, styles, options) => {
  const opts = options || {
    returnType: 'html'
  };

  const points = getPoints(styles);
  const segments = getSegments(styles, points);
  return opts.returnType === 'object' ? segments : genHtml(segments, text);
};

