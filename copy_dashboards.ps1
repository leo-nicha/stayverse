$content = Get-Content -Path "d:\BA\stayverse\app\admin\page.tsx" -Raw
$content = $content -replace "'./AdminShell'", "'../admin/AdminShell'"

$devContent = $content -replace "export default function AdminPage", "export default function DeveloperPage"
Set-Content -Path "d:\BA\stayverse\app\developer\page.tsx" -Value $devContent -Encoding UTF8

$affContent = $content -replace "export default function AdminPage", "export default function AffiliatePage"
Set-Content -Path "d:\BA\stayverse\app\affiliate\page.tsx" -Value $affContent -Encoding UTF8

$tenContent = $content -replace "export default function AdminPage", "export default function TenantPage"
Set-Content -Path "d:\BA\stayverse\app\tenant\page.tsx" -Value $tenContent -Encoding UTF8
