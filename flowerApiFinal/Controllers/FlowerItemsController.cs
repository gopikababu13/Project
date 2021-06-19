using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using flowerApiFinal.Models;

namespace flowerApiFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowerItemsController : ControllerBase
    {
        private readonly FlowerDbContext _context;

        public FlowerItemsController(FlowerDbContext context)
        {
            _context = context;
        }

        // GET: api/FlowerItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlowerItem>>> GetFlowerItems()
        {
            return await _context.FlowerItems.ToListAsync();
        }

        // GET: api/FlowerItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FlowerItem>> GetFlowerItem(int id)
        {
            var flowerItem = await _context.FlowerItems.FindAsync(id);

            if (flowerItem == null)
            {
                return NotFound();
            }

            return flowerItem;
        }

        // PUT: api/FlowerItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlowerItem(int id, FlowerItem flowerItem)
        {
            if (id != flowerItem.FlowerItemId)
            {
                return BadRequest();
            }

            _context.Entry(flowerItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlowerItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FlowerItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FlowerItem>> PostFlowerItem(FlowerItem flowerItem)
        {
            _context.FlowerItems.Add(flowerItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlowerItem", new { id = flowerItem.FlowerItemId }, flowerItem);
        }

        // DELETE: api/FlowerItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlowerItem(int id)
        {
            var flowerItem = await _context.FlowerItems.FindAsync(id);
            if (flowerItem == null)
            {
                return NotFound();
            }

            _context.FlowerItems.Remove(flowerItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlowerItemExists(int id)
        {
            return _context.FlowerItems.Any(e => e.FlowerItemId == id);
        }
    }
}
