/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable:false,
  register:true,
  skipWaiting:true

})

module.exports = withPWA({
  reactStrictMode: true,
})