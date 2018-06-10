using App.Core.Providers;
using App.Data;
using App.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core
{
    public class UnitOfWork : IUnitOfWork
    {
        protected AppDbContext DbContext { get; set; }

        private readonly IRepositoryProvider _repositoryProvider;

        public UnitOfWork(IRepositoryProvider repositoryProvider, DbContextOptions<AppDbContext> contextOptions)
        {
            CreateDbContext(contextOptions);

            repositoryProvider.DbContext = DbContext;
            _repositoryProvider = repositoryProvider;
        }

        protected void CreateDbContext(DbContextOptions<AppDbContext> contextOptions)
        {
            DbContext = new AppDbContext(contextOptions);
            DbContext.Database.EnsureCreated();
        }


        // Repositories

        public Task<int> CommitAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            return DbContext.SaveChangesAsync(cancellationToken);
        }

        public IRepository<TEntity> Repository<TEntity>() where TEntity : class, IEntity
        {
            return GetStandarRepo<TEntity>();
        }

        protected T GetRepo<T>() where T : class
        {
            return _repositoryProvider.GetRepository<T>();
        }

        protected IRepository<T> GetStandarRepo<T>() where T : class, IEntity
        {
            return _repositoryProvider.GetRepositoryForEntityType<T>();
        }

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                //if (disposing)
                //    DbContext.Dispose();
            }

            _disposed = true;

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
