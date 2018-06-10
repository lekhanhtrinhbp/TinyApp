using App.Data.Model;
using App.Data.Model.Common;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Services
{
    public interface IRestaurantService
    {
        Task<IEnumerable<Restaurant>> FindAllAsync(Pagination pagination, string[] includes = null, CancellationToken cancellationToken = default(CancellationToken));

        Task<Restaurant> FindAsync(int id, CancellationToken cancellationToken = default(CancellationToken));

        Task<Restaurant> CreateAsync(Restaurant restaurant, CancellationToken cancellationToken = default(CancellationToken));

        Task<Restaurant> UpdateAsync(Restaurant restaurant, CancellationToken cancellationToken = default(CancellationToken));

        Task<Restaurant> DeleteAsync(Restaurant restaurant, CancellationToken cancellationToken = default(CancellationToken));
    }
}
