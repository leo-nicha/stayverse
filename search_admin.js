const fs = require('fs');
const content = fs.readFileSync('app/admin/page.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes("'/admin'") || line.includes('"/admin"')) {
    console.log(`Line ${index + 1}: ${line}`);
  }
});
