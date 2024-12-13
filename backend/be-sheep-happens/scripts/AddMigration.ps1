$path = $MyInvocation.MyCommand.Path
$parentPath = $(Split-Path (Split-Path $path -Parent) -Parent)
$message = $(Read-Host -Prompt 'Input message')

dotnet ef migrations add $message --project $parentPath\src\SheepHappens.Api --startup-project $parentPath\src\SheepHappens.Api --output-dir $parentPath\src\SheepHappens.Api\Persistence\Migrations --context MainDbContext
