using App.Api.Models;
using App.Core.Services;
using App.Data.Model;
using App.Data.Model.Common;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class RestaurantsController : Controller
    {
        private readonly IRestaurantCrawler _restaurantCrawler;
        private readonly IRestaurantService _restaurantService;
        protected readonly IMapper _mapper;

        public RestaurantsController(IRestaurantCrawler restaurantCrawler, IRestaurantService restaurantService, IMapper mapper)
        {
            _restaurantCrawler = restaurantCrawler ?? throw new ArgumentNullException(nameof(restaurantCrawler));
            _restaurantService = restaurantService ?? throw new ArgumentNullException(nameof(restaurantService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Pagination pagination, string fields = null, CancellationToken cancellationToken = default(CancellationToken))
        {
            var restaurants = await _restaurantService.FindAllAsync(pagination, fields?.Split(','), cancellationToken);

            return Ok(restaurants.Select(_mapper.Map<RestaurantDto>));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, CancellationToken cancellationToken)
        {
            Restaurant restaurant = await _restaurantService.FindAsync(id, cancellationToken);
            if (restaurant == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<RestaurantDto>(restaurant));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] RestaurantDto dto, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var restaurant = new Restaurant
            {
                Name = dto.Name,
                Url = dto.Url,
                Image = dto.Image
            };

            restaurant = await _restaurantService.CreateAsync(restaurant, cancellationToken);

            return Created(Request.Path, _mapper.Map<RestaurantDto>(restaurant));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] RestaurantDto dto, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Restaurant restaurant = await _restaurantService.FindAsync(id, cancellationToken);
            if (restaurant == null)
            {
                return NotFound();
            }

            restaurant.Name = dto.Name;
            restaurant.Image = dto.Image;
            restaurant.Url = dto.Url;

            restaurant = await _restaurantService.UpdateAsync(restaurant, cancellationToken);

            return Ok(_mapper.Map<RestaurantDto>(restaurant));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            Restaurant restaurant = await _restaurantService.FindAsync(id, cancellationToken);
            if (restaurant == null)
            {
                return NotFound();
            }

            await _restaurantService.DeleteAsync(restaurant, cancellationToken);

            return Ok();
        }
    }
}
