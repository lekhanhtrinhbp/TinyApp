using App.Data.Extensions;
using App.Data.Model;
using App.Data.Model.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core
{
    public class BaseRepository<T> : IRepository<T> where T : class, IEntity
    {
        public BaseRepository(DbContext dbContext)
        {
            DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            DbSet = dbContext.Set<T>();
        }

        protected DbSet<T> DbSet { get; set; }

        protected DbContext DbContext { get; set; }

        #region Implementation of IRepository<T>

        public virtual async Task<IEnumerable<T>> FindAllAsync(Pagination pagination, string[] includes = null, CancellationToken cancellationToken = default(CancellationToken))
        {
            IQueryable<T> q = DbSet.AsQueryable();

            return await q.FindAllAsync(pagination, includes, cancellationToken).ConfigureAwait(false);
        }

        public virtual IQueryable<T> All()
        {
            return DbSet;
        }

        public async virtual Task<T> FindByIdAsync(int id, string[] includes = null, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (includes == null)
            {
                return await DbSet.FindAsync(new object[] { id }, cancellationToken).ConfigureAwait(false);
            }
            else
            {
                IQueryable<T> q = DbSet.Where(m => m.Id == id).Include(includes);

                return await q.FirstOrDefaultAsync(cancellationToken).ConfigureAwait(false);
            }
        }

        public virtual Task AddAsync(T entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            var entry = DbContext.Entry(entity);

            entity.CreatedAt = DateTime.Now;
            entity.ModifiedAt = DateTime.Now;

            if (entry.State != EntityState.Detached)
            {
                entry.State = EntityState.Added;
                return Task.FromResult(entity);
            }
            else
            {
                return DbSet.AddAsync(entity, cancellationToken);
            }
        }

        public virtual Task UpdateAsync(T entity)
        {
            var dbEntityEntry = DbContext.Entry(entity);

            entity.ModifiedAt = DateTime.Now;

            if (dbEntityEntry.State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }

            dbEntityEntry.State = EntityState.Modified;

            return Task.CompletedTask;
        }

        public virtual Task DeleteAsync(T entity)
        {
            var dbEntityEntry = DbContext.Entry(entity);

            if (dbEntityEntry.State != EntityState.Deleted)
            {
                dbEntityEntry.State = EntityState.Deleted;
            }
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }

            return Task.CompletedTask;
        }

        #endregion
    }
}
