using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class ExtendShift
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int EmployeeID { get; set; }
        public int ShiftID { get; set; }


        public System.DateTime Date { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }
    }
}