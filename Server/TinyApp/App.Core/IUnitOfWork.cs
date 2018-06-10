using App.Data.Model;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core
{
    public interface IUnitOfWork : IDisposable
    {
        Task<int> CommitAsync(CancellationToken cancellationToken = default(CancellationToken));

        IRepository<T> Repository<T>() where T : class, IEntity;
    }
}
