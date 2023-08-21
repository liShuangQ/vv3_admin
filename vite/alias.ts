import * as path from 'path'
import { AliasOptions } from 'vite'

const alias = {
  '@': path.resolve(__dirname, '../src'),
  '#': path.resolve(__dirname, '../types'),
  'vue': 'vue/dist/vue.esm-bundler.js' 
} as AliasOptions

export default alias
