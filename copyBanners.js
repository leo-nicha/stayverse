const fs = require('fs');
const path = require('path');

const src1 = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\stayverse_advisory_banner_1779444619978.png';
const src2 = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\stayverse_facebook_banner_1779444638952.png';

const dest1 = 'd:\\BA\\stayverse\\public\\stayverse-advisory-banner.png';
const dest2 = 'd:\\BA\\stayverse\\public\\stayverse-facebook-banner.png';

try {
  fs.copyFileSync(src1, dest1);
  console.log('Copied advisory banner successfully');
} catch (err) {
  console.error('Error copying advisory banner:', err);
}

try {
  fs.copyFileSync(src2, dest2);
  console.log('Copied facebook banner successfully');
} catch (err) {
  console.error('Error copying facebook banner:', err);
}
