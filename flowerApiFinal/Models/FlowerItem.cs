using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace flowerApiFinal.Models
{
    public class FlowerItem
    {
        [Key]
        public int FlowerItemId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string FlowerItemName { get; set; }

        public decimal Price { get; set; }
    }
}
