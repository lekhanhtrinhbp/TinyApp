using App.Data.Model;
using App.Data.Model.Common;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Services
{
    public class RestaurantService : BaseService, IRestaurantService
    {
        public RestaurantService(IUnitOfWork unitOfWork)
        : base(unitOfWork)
        {
        }

        public Task<IEnumerable<Restaurant>> FindAllAsync(Pagination pagination, string[] includes = null, CancellationToken cancellationToken = default(CancellationToken))
        {
            return _unitOfWork.Repository<Restaurant>().FindAllAsync(pagination, includes, cancellationToken);
        }

        public Task<Restaurant> FindAsync(int id, CancellationToken cancellationToken = default(CancellationToken))
        {
            return _unitOfWork.Repository<Restaurant>().FindByIdAsync(id);
        }

        public async Task<Restaurant> CreateAsync(Restaurant restaurant, CancellationToken cancellationToken = default(CancellationToken))
        {
            await _unitOfWork.Repository<Restaurant>().AddAsync(restaurant);

            await _unitOfWork.CommitAsync(cancellationToken);

            return restaurant;
        }

        public async Task<Restaurant> UpdateAsync(Restaurant restaurant, CancellationToken cancellationToken = default(CancellationToken))
        {
            await _unitOfWork.Repository<Restaurant>().UpdateAsync(restaurant);

            await _unitOfWork.CommitAsync(cancellationToken);

            return restaurant;
        }

        public async Task<Restaurant> DeleteAsync(Restaurant restaurant, CancellationToken cancellationToken = default(CancellationToken))
        {
            await _unitOfWork.Repository<Restaurant>().DeleteAsync(restaurant);

            await _unitOfWork.CommitAsync(cancellationToken);

            return restaurant;
        }
    }
}
