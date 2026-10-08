// @ts-check
//import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';
import { trace } from 'node:console';
const {devices}=require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  retries :1, 
  timeout:15*1000,
  expect:{
      timeout:10*1000
  },
  
  use: {
   browserName:'chromium',
   headless:false,
   trace: 'on',
   reporter:'html'
  }
 
});
module.exports=config
