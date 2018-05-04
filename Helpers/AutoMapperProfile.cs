using Data.Models;
using Data.ViewModels;
using AutoMapper;

namespace BasicApp.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserViewModel>().ReverseMap();
        }
    }
}