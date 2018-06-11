using System.Collections.Generic;

namespace App.Data.Model.Common
{
    public class ApiResponse<T>
    {
        public ApiResponse(Pagination pagination, IEnumerable<T> items)
        {
            Page = pagination.Page;
            PageSize = pagination.PageSize;
            Total = pagination.Total;
            Items = items;
        }

        public int Page { get; set; }
        public int PageSize { get; set; }
        public int Total { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}
