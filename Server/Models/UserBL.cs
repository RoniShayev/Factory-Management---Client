using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class UserBL
    {
        ProjectDBEntities db = new ProjectDBEntities();

        public User getUserName(string username)
        {
            return db.User.Where(x => x.UserName == username).First();
        }

        public List<User> GetUserData()
        {
            return db.User.ToList();
        }

        public User GetUserByID(int id)
        {
            return db.User.Where(x => x.ID == id).First();
        }

        public void UpdateUser(User user, int id)
        {
            User use = db.User.Where(x => x.ID == id).First();
            
            use.FullName = user.FullName;
            use.Password = user.Password;
            use.NumOfAction = user.NumOfAction;

            db.SaveChanges();
        }
    }
    }