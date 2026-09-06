import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-unsafe-swiftshader']});
const desktop=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});const page=await desktop.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
await page.getByRole('button',{name:'PAUSE MOTION'}).click();await expect(page.locator('.marquee')).toHaveClass(/paused/);await page.getByRole('button',{name:'RESUME MOTION'}).click();
await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:'artifacts/final-desktop.png'});
const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();console.log('desktop axe',axe.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})));
for(const id of ['about','projects','sociapi','social','contact']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/final-${id}.png`});}
await page.evaluate(()=>document.querySelector('canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true})));await expect(page.locator('.static-workspace')).toBeVisible();await expect(page.locator('canvas')).toHaveCount(0);
console.log('WebGL context loss fallback passed; errors:',errors);
const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});const mp=await mobile.newPage();await mp.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await expect(mp.locator('.custom-cursor')).not.toBeVisible();await mp.screenshot({path:'artifacts/final-mobile.png'});await mp.locator('#contact').scrollIntoViewIfNeeded();await mp.screenshot({path:'artifacts/final-mobile-contact.png'});const ma=await new AxeBuilder({page:mp}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();console.log('touch mobile axe',ma.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})));expect(await mp.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
await fs.writeFile('artifacts/final-browser-results.json',JSON.stringify({desktopAxe:axe.violations.length,mobileAxe:ma.violations.length,errors,contextLoss:'passed',touchCursor:'disabled',motionToggle:'passed'},null,2));await browser.close();
