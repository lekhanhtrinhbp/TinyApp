using App.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace App.Core.Providers
{
    public class RepositoryProvider : IRepositoryProvider
    {
        private readonly Dictionary<Type, object> _repositories;
        private readonly RepositoryFactory _repositoryFactory;

        public RepositoryProvider(RepositoryFactory repositoryFactories)
        {
            _repositoryFactory = repositoryFactories;
            _repositories = new Dictionary<Type, object>();
        }

        public DbContext DbContext { get; set; }

        public IRepository<T> GetRepositoryForEntityType<T>() where T : class, IEntity
        {
            return GetRepository<IRepository<T>>(_repositoryFactory.GetRepositoryFactoryForEntityType<T>());
        }

        public T GetRepository<T>(Func<DbContext, object> factory = null) where T : class
        {
            _repositories.TryGetValue(typeof(T), out var repoObj);
            if (repoObj != null)
            {
                return (T)repoObj;
            }

            return MakeRepository<T>(factory, DbContext);
        }

        public void SetRepository<T>(T repository)
        {
            _repositories[typeof(T)] = repository;
        }

        private T MakeRepository<T>(Func<DbContext, object> factory, DbContext dbContext) where T : class
        {
            var f = factory ?? _repositoryFactory.GetRepositoryFactory<T>();
            if (f == null)
            {
                throw new NotImplementedException("No factory for repository type, " + typeof(T).FullName);
            }

            var repo = (T)f(dbContext);

            _repositories[typeof(T)] = repo;

            return repo;
        }
    }
}
