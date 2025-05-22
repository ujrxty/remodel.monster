/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    // Disable the rule for unescaped entities in JSX which causes issues with framer-motion objects
    'react/no-unescaped-entities': 'off',
  }
};