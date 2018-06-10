using App.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace App.Core.Providers
{
    public interface IRepositoryProvider
    {
        DbContext DbContext { get; set; }

        IRepository<T> GetRepositoryForEntityType<T>() where T : class, IEntity;

        T GetRepository<T>(Func<DbContext, object> factory = null) where T : class;

        void SetRepository<T>(T repository);
    }
}
