using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Project1.Models;
using System.Web.Http.Cors;

namespace Project1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        static UserBL userBL = new UserBL();
        // GET: api/User
        public List<User> Get()
        {
            return userBL.GetUserData();
        }

        // GET: api/User/5
        public User Get(int id)
        {
            return userBL.GetUserByID(id);
        }

        // POST: api/User
        public User Post(User u)
        {
            return userBL.getUserName(u.UserName);

        }

        // PUT: api/User/5
        public string Put(int id, User use)
        {
            userBL.UpdateUser(use, id);
            return "User updated!";
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}
