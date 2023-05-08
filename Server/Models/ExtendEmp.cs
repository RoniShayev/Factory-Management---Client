using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class ExtendEmp
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int StartWorkYear { get; set; }
        public int DepartmentID { get; set; }

        public string Name { get; set; }
        public int Manager { get; set; }

        public ExtendEmp()
        {
            ExtendShiftz = new List<ExtendShift>();
        }
        public List<ExtendShift> ExtendShiftz { get; set; }


    }
}