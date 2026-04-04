import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'Xiaolan-Docs',
  description: '您好！欢迎阅读Xiaolan-Docs',

  theme: defaultTheme({
    logo: 'https://raw.githubusercontent.com/Xiaolan2333/Xiaolan2333.github.io/refs/heads/main/images/logo.webp',

    navbar: ['/'],
  }),

  bundler: viteBundler(),
})
