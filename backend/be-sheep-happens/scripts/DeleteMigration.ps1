$path = $MyInvocation.MyCommand.Path
$parentPath = $(Split-Path (Split-Path $path -Parent) -Parent)
dotnet ef migrations remove --project $parentPath\src\SheepHappens.Api --startup-project $parentPath\src\SheepHappens.Api --context MainDbContext