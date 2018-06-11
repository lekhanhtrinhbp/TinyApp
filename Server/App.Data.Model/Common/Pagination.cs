namespace App.Data.Model.Common
{
    public class Pagination
    {
        public string Query { get; set; }
        public string Field { get; set; }
        public string Sort { get; set; } = "asc";
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int Total { get; set; }
    }
}
