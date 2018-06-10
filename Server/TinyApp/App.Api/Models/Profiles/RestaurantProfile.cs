using App.Data.Model;
using AutoMapper;

namespace App.Api.Models.Profiles
{
    public class RestaurantProfile : Profile
    {
        public RestaurantProfile()
        {
            CreateMap<Restaurant, RestaurantDto>();
        }
    }
}
