using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace flowerApiFinal.Models
{
    public class OrderDetail
    {
        [Key]
        public long OrderDetailId { get; set; }

        public long OrderMasterId { get; set; }

        public int FlowerItemId { get; set; }
        public FlowerItem FlowerItem { get; set; } //forign key from Flower item table

        public decimal FlowerItemPrice { get; set; }

        public int Quantity { get; set; }
    }
}
