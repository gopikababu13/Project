using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flowerApiFinal.Models
{
    public class FlowerDbContext:DbContext
    {
        public FlowerDbContext(DbContextOptions<FlowerDbContext>options):base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<FlowerItem> FlowerItems { get; set; }
        public DbSet<OrderMaster> OrderMasters { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}
