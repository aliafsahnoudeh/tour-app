using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<TourAppDatabaseSettings>(
    builder.Configuration.GetSection("TourAppDatabase"));


// Add services to the container.
builder.Services.AddSingleton<IDriver, DriverModel>();
builder.Services.AddSingleton<IRepository<DriverModel>, DriverRepository>();
builder.Services.AddSingleton<IRepository<TourModel>, TourRepository>();

builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddControllers();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
