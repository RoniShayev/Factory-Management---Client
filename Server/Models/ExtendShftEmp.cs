using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class ExtendShftEmp
    {
        public int ID { get; set; }
        public System.DateTime Date { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }

        public ExtendShftEmp()
        {
            ExtendShiftz = new List<ExtendShift>();
        }
        public List<ExtendShift> ExtendShiftz { get; set; }

        public int ShiftID { get; set; }
    }
}
