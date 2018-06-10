using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Services
{
    public interface IRestaurantCrawler
    {
        Task Craw(CancellationToken cancellationToken = default(CancellationToken));
    }
}
