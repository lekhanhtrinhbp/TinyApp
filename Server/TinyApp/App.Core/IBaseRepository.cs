using App.Data.Model;
using App.Data.Model.Common;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core
{
    public interface IRepository<T> where T : class, IEntity
    {
        Task<IEnumerable<T>> FindAllAsync(Pagination pagination, string[] includes = null, CancellationToken cancellationToken = default(CancellationToken));

        IQueryable<T> All();

        Task<T> FindByIdAsync(int id, string[] includes = null, CancellationToken cancellationToken = default(CancellationToken));

        Task AddAsync(T entity, CancellationToken cancellationToken = default(CancellationToken));

        Task UpdateAsync(T entity);

        Task DeleteAsync(T entity);
    }
}
