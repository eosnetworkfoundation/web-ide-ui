import {createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    screens:{
        'sm': '480px',
        'md': '768px',
        'lg': '976px',
        'xl': '1440px',
    },
    extend: {
      // colors:{
      //   navBarBg:'#f3f3f3',
      //   sidebarBg:'#252526',
      //   codeBg:'#1E1E1E',
      //   fileBarBg:'#252526',
      //   fileBarUnselected:'#2D2D2D',
      //   sideMenuBarBorder:'#2d2d2d',
      //   contextMenuBg:'#3C3C3C',
      //   contextMenuItemHover:'#04395E',
      //   contextMenuDivider:'#575757',
      //   fontColor:'#FFFFFF',
      //   fontColorInverted:'#272727',
      //   fontHighlight:'#fff1a9',
      //   inputBorder:'#676767',
      //   inputBg:'#1A1A1A',
      // }
    },
  },
  plugins: [
    createThemes({
      'vs-dark': {
        navBarBg:'#000000',
        sidebarBg:'#252526',
        codeBg:'#1E1E1E',
        fileBarBg:'#252526',
        fileBarUnselected:'#2D2D2D',
        fileBarSelected:'#1E1E1E',
        sideMenuBarBorder:'#2d2d2d',
        contextMenuBg:'#3C3C3C',
        contextMenuItemHover:'#04395E',
        contextMenuDivider:'#575757',
        fontColor:'#FFFFFF',
        fontColorInverted:'#272727',
        fontColorNavbar:'#e3e3e3',
        fontHighlight:'#fff1a9',
        inputBorder:'#676767',
        inputBg:'#1A1A1A',
      },
      'vs-light': {
        navBarBg:'#f6f6f6',
        sidebarBg:'#E8E8E8',
        codeBg:'#F9F9F9',
        fileBarBg:'#E8E8E8',
        fileBarUnselected:'#dedede',
        fileBarSelected:'#ffffff',
        sideMenuBarBorder:'#e3e3e3',
        contextMenuBg:'#ffffff',
        contextMenuItemHover:'#f8f8f8',
        contextMenuDivider:'#dcdcdc',
        fontColor:'#2f2f2f',
        fontColorInverted:'#f5f5f5',
        fontColorNavbar:'#2f2f2f',
        fontHighlight:'#3881ff',
        inputBorder:'#dedede',
        inputBg:'#e5e5e5',
      },
    })
  ],
  content: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
  // darkMode: false, // or 'media' or 'class'
}
