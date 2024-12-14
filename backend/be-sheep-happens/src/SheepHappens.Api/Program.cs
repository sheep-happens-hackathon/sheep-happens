using SheepHappens.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterDbContext(builder.Configuration);
builder.Services.AddDependencyInjection();

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
