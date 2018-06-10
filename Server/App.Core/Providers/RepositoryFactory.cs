using App.Core.Repositories;
using App.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace App.Core.Providers
{
    public class RepositoryFactory
    {
        private readonly Dictionary<Type, Func<DbContext, object>> _factories;

        public RepositoryFactory()
        {
            _factories = GetFbRepositoryFactories();
        }

        public RepositoryFactory(Dictionary<Type, Func<DbContext, object>> factories)
        {
            _factories = factories;
        }

        private static Dictionary<Type, Func<DbContext, object>> GetFbRepositoryFactories()
        {
            return new Dictionary<Type, Func<DbContext, object>>
            {
                {typeof (IRestaurantRepository), dbContext => new RestaurantRepository(dbContext)},
            };
        }

        public Func<DbContext, object> GetRepositoryFactory<T>() where T : class
        {
            var type = typeof(T);
            _factories.TryGetValue(type, out var factory);
            return factory;
        }

        public Func<DbContext, object> GetRepositoryFactoryForEntityType<T>() where T : class, IEntity
        {
            return GetRepositoryFactory<T>() ?? DefaultRepositoryFactory<T>();
        }

        private static Func<DbContext, object> DefaultRepositoryFactory<T>() where T : class, IEntity
        {
            return dbContext => new BaseRepository<T>(dbContext);
        }
    }
}
