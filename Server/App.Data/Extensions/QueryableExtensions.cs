using App.Data.Exeptions;
using App.Data.Model.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Dynamic.Core.Exceptions;
using System.Threading;
using System.Threading.Tasks;

namespace App.Data.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> Include<T>(this IQueryable<T> query, string[] includes) where T : class
        {
            if (includes != null)
            {
                foreach (string include in includes)
                {
                    if (!string.IsNullOrEmpty(include))
                    {
                        query = query.Include(include);
                    }
                }
            }

            return query;
        }

        public static async Task<IQueryable<T>> FindAllAsync<T>(this IQueryable<T> query, Pagination pagination, string[] includes = null, CancellationToken cancellationToken = default(CancellationToken))
            where T : class
        {
            query = query.Include(includes);

            if (pagination != null)
            {
                Tuple<string, object[]> filters;

                if (!pagination.TryConvertToQueryString(out filters))
                {
                    throw new PaginationException();
                }

                if (!string.IsNullOrEmpty(filters.Item1))
                {
                    try
                    {
                        query = query.Where(filters.Item1, filters.Item2);
                    }
                    catch (ParseException)
                    {
                        throw new PaginationException();
                    }
                }

                pagination.Total = await query.CountAsync(cancellationToken);

                if (!string.IsNullOrEmpty(pagination.Field))
                {
                    query = query.OrderBy($"{pagination.Field} {pagination.Sort}");
                }

                if (pagination.Page > 1 && pagination.PageSize > 0)
                {
                    query = query.Skip((pagination.Page - 1) * pagination.PageSize);
                }

                if (pagination.PageSize > 0)
                {
                    query = query.Take(pagination.PageSize);
                }
            }

            return query;
        }
    }
}
