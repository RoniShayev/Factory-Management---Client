using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class LoginBL
    {
        private ProjectDBEntities db = new ProjectDBEntities();

        public List<ExtendUser> GetUserDatas()
        {
            var result = from user in db.User
                         select new ExtendUser
                         {
                             ID = user.ID,
                             FullName = user.FullName,
                             UserName = user.UserName,
                             Password = user.Password , 
                             NumOfAction = user.NumOfAction
                         };

            return result.ToList();
        }

        public ExtendUser GetUserData(int id)
        {
            {
                var result = from user in db.User

                             select new ExtendUser
                             {
                                 ID = user.ID,
                                 FullName = user.FullName,
                                 UserName = user.UserName,
                                 Password = user.Password ,
                                 NumOfAction = user.NumOfAction
                             };

                return result.Where(x => x.ID == id).First();
            }
        }
            public bool IsUserExist(string user_name , int password)
        {
            var result = db.User.Where(x => x.UserName == user_name && x.Password == password);
            if(result.Count()>0)
            {
                return true;

            }
            else
            {
                return false;
            }
        }
        public ExtendUser getUserByNameAndPassword(string user_name, int password)
        {
            var result = db.User.Where(x => x.UserName == user_name && x.Password == password);
            if (result.Count() > 0)
            {
                var result1 = from user in db.User

                             select new ExtendUser
                             {
                                 ID = user.ID,
                                 FullName = user.FullName,
                                 UserName = user.UserName,
                                 Password = user.Password,
                                 NumOfAction = user.NumOfAction
                             };

                return result1.Where(x => x.UserName == user_name).First();
            }

            else
            {
                return null;
            }
        }

    }
}



    