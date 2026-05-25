const fs = require('fs');
const path = require('path');

const srcFiles = [
  'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\f8020a4c-9551-4a3e-84f8-a531a16afe13\\condo_mockup_1779430684643.png',
  'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\f8020a4c-9551-4a3e-84f8-a531a16afe13\\house_mockup_1779430697755.png',
  'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\f8020a4c-9551-4a3e-84f8-a531a16afe13\\townhome_mockup_1779430714960.png'
];

const destNames = ['condo.png', 'house.png', 'townhome.png'];
const destDir = 'd:\\BA\\stayverse\\public\\images';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

srcFiles.forEach((src, idx) => {
  const dest = path.join(destDir, destNames[idx]);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
});
