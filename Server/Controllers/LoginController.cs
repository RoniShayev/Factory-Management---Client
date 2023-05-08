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

    public class LoginController : ApiController
    {

        private static LoginBL logBL = new LoginBL();
        // GET: api/Login
        public List<ExtendUser> Get()
        {
            return logBL.GetUserDatas();
        }


        // GET: api/Login/5
        public ExtendUser Get(int id)
        {
            return logBL.GetUserData(id);
        }



        // POST: api/Login
        public bool Post(User user)
        {
            return logBL.IsUserExist(user.UserName, user.Password);
          
        }

      
        // PUT: api/Login/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Login/5
        public void Delete(int id)
        {
        }
    }
}
