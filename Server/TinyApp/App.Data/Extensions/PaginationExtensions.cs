using App.Data.Model.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace App.Data.Extensions
{
    public static class PaginationExtensions
    {
        public static bool TryConvertToQueryString(this Pagination pagination, out Tuple<string, object[]> result)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pagination.Query))
                {
                    result = new Tuple<string, object[]>(string.Empty, null);

                    return true;
                }

                var filters = JsonConvert.DeserializeObject<FilterExpression[]>(pagination.Query);

                List<string> predicates = new List<string>();

                for (int i = 0; i < filters.Count(); i++)
                {
                    FilterExpression filter = filters[i];

                    switch (filter.Op)
                    {
                        case "cn":
                            predicates.Add($"{filter.Field}.Contains(@{i})");
                            break;
                        case "eq":
                            predicates.Add($"{filter.Field} = @{i}");
                            break;
                        case "gt":
                            predicates.Add($"{filter.Field} > @{i}");
                            break;
                        case "lt":
                            predicates.Add($"{filter.Field} < @{i}");
                            break;
                        case "ge":
                            predicates.Add($"{filter.Field} >= @{i}");
                            break;
                        case "le":
                            predicates.Add($"{filter.Field} <= @{i}");
                            break;
                        case "ne":
                            predicates.Add($"{filter.Field} <> @{i}");
                            break;
                        default:
                            throw new NotSupportedException();
                    }
                }

                result = new Tuple<string, object[]>(
                    string.Join(" AND ", predicates),
                    filters.Select(filter => filter.Data).ToArray()
                );

                return true;
            }
            catch
            {
                result = null;

                return false;
            }
        }
    }

    internal class FilterExpression
    {
        public string Field { get; set; }
        public string Op { get; set; }
        public object Data { get; set; }
    }
}
