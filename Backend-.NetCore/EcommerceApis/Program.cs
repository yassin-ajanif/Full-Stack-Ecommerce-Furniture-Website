//var builder = WebApplication.CreateBuilder(args);
//
//// Add services to the container.
//
//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
//
//var app = builder.Build();
//
//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
//
//app.UseHttpsRedirection();
//
//app.UseAuthorization();
//
//app.MapControllers();
//
//app.Run();



using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataBusinessLayer;
using DataBusinessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add CORS service to allow cross-origin requests
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("http://localhost:4200")  // Allow requests from Angular app running on localhost:4200
                          .AllowAnyMethod()                        // Allow any HTTP method (GET, POST, etc.)
                          .AllowAnyHeader());                      // Allow any headers in requests
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AppDbContext>();

// Register Repository (Data Access Layer)
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Register Service (Business Logic Layer)
builder.Services.AddScoped<IProductService, ProductsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS by using the policy
app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();

app.Run();
