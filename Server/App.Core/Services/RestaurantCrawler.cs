using App.Data.Model;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Services
{
    public class RestaurantCrawler : IRestaurantCrawler
    {
        private readonly string rootUrl;
        private readonly string URL;
        private readonly IRestaurantService _restaurantService;

        public RestaurantCrawler(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService ?? throw new ArgumentNullException(nameof(restaurantService));
            rootUrl = "https://www.tripadvisor.com";
            URL = "https://www.tripadvisor.com/Restaurants-g293951-Malaysia.html";            
        }

        public async Task Craw(CancellationToken cancellationToken = default(CancellationToken))
        {
            HtmlWeb web = new HtmlWeb();
            var htmlDoc = web.Load(URL);

            var containerNode = htmlDoc.DocumentNode.SelectSingleNode(@"//*[@id=""BROAD_GRID""]/div");

            var nodes = GetElementsWithClass(containerNode, "geo_wrap");
            if (nodes != null)
            {
                foreach (var node in nodes)
                {
                    var restaurant = TryParse(node);
                    if (restaurant != null)
                    {
                        await _restaurantService.CreateAsync(restaurant, cancellationToken);
                    }
                }
            }
        }

        private static IEnumerable<HtmlNode> GetElementsWithClass(HtmlNode node, string className)
        {
            Regex regex = new Regex("\\b" + Regex.Escape(className) + "\\b", RegexOptions.Compiled);

            return node
                .Descendants()
                .Where(n => n.NodeType == HtmlNodeType.Element)
                .Where(e => e.Name == "div" && regex.IsMatch(e.GetAttributeValue("class", "")));
        }

        private Restaurant TryParse(HtmlNode node)
        {
            try
            {
                var linkEle = node.SelectSingleNode(".//div/div[1]/div[2]/a");
                var imageEle = node.SelectSingleNode(".//div/div[2]/a/div/img");
                if (linkEle == null || imageEle == null)
                {
                    return null;
                }

                string url = $"{rootUrl}{linkEle.Attributes["href"]?.Value}";
                string name = linkEle.InnerText;
                string image = imageEle.Attributes["src"]?.Value;

                return new Restaurant
                {
                    Name = name,
                    Url = url,
                    Image = image
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
