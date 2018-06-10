using App.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ValuesController : Controller
    {
        private readonly IRestaurantCrawler _restaurantCrawler;

        public ValuesController(IRestaurantCrawler restaurantCrawler)
        {
            _restaurantCrawler = restaurantCrawler ?? throw new ArgumentNullException(nameof(restaurantCrawler));
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            await _restaurantCrawler.Craw(cancellationToken);
            return Ok("Success");
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
