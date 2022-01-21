/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]);
module.exports = withPlugins([withTM], {
  reactStrictMode: true,
});
