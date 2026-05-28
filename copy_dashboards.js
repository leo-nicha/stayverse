const fs = require('fs');
let content = fs.readFileSync('app/admin/page.tsx', 'utf8');
content = content.replace(/'\.\/AdminShell'/g, "'../admin/AdminShell'");

const devContent = content.replace(/export default function AdminPage/g, 'export default function DeveloperPage');
fs.writeFileSync('app/developer/page.tsx', devContent, 'utf8');

const affContent = content.replace(/export default function AdminPage/g, 'export default function AffiliatePage');
fs.writeFileSync('app/affiliate/page.tsx', affContent, 'utf8');

const tenContent = content.replace(/export default function AdminPage/g, 'export default function TenantPage');
fs.writeFileSync('app/tenant/page.tsx', tenContent, 'utf8');
