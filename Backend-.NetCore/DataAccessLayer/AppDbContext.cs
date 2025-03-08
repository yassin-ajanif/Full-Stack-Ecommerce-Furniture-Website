using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class AppDbContext : IdentityDbContext<User>
           
        //
    {

      /**/  public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(DbConnection.sqlConStr);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            // Use SelectMany to get all foreign key relationships in one step
            var foreignKeys = modelBuilder.Model.GetEntityTypes()
                .SelectMany(entityType => entityType.GetForeignKeys());

            foreach (var foreignKey in foreignKeys)
            {
                // Configure DeleteBehavior.Restrict for each relationship
                foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
            }


            base.OnModelCreating(modelBuilder);
        }


        public DbSet<Product> Products { get; set; }
        public DbSet<CategoryProduct> ProductsCategories { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart> Carts { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<PaymentStatus> PaymentStatuses { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<CartItem> CartItems { get; set; }





    }
}
