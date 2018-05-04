using System;
using System.Collections.Generic;
using System.Linq;
using Data.Models;

namespace Data.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        User Authenticate(string username, string password);
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}
