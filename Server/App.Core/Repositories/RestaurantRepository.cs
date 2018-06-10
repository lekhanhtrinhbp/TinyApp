using App.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace App.Core.Repositories
{
    public class RestaurantRepository : BaseRepository<Restaurant>, IRestaurantRepository
    {
        public RestaurantRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
