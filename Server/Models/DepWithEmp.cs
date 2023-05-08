using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class DepWithEmp
    {
        private ProjectDBEntities db = new ProjectDBEntities();

        public int ID { get; set; }
        public string Name { get; set; }
        public int Manager { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int DepartmentID { get; set; }
    }
}