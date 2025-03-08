
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataBusinessLayer;
using DataBusinessLayer.Interfaces;
using Microsoft.AspNetCore.Identity;
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


// we make the migration adding or manipulation to run at datalayer class

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(options => options.MigrationsAssembly("DataAccessLayer")));

// make or activate the identity so the services of it like uermanager and loginmanager to be ready injectable using depcy injection
builder.Services.AddIdentity<User,IdentityRole>().AddEntityFrameworkStores<AppDbContext>();

// Register Repository (Data Access Layer)
builder.Services.AddScoped<IProductRepository, ProductRepository>();
// Register Service (Business Logic Layer)
builder.Services.AddScoped<IProductService, ProductsService>();

// Register Repository (Data Access Layer)
builder.Services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();
// Register Service (Business Logic Layer)
builder.Services.AddScoped<IProductCategoryService, CategoryProductsService>();

builder.Services.AddScoped<IUserService, UserService>();



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
