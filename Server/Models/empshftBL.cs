using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project1.Models;

namespace Project1.Models
{
    public class empshftBL
    {
        private ProjectDBEntities db = new ProjectDBEntities();
        ShiftBL shiftBL = new ShiftBL();

        public List<ExtendShftEmp> GetShftEmpDatas()
        {
            var result4 = (from shftemp in db.Shift
                           orderby shftemp.ID

                           select new ExtendShftEmp
                           {
                               ID = shftemp.ID,
                               Date = shftemp.Date,
                               StartTime = shftemp.StartTime,
                               EndTime = shftemp.EndTime

                           }).ToList();
            foreach (var i in result4)
            {
                i.ExtendShiftz = shiftBL.GetShifts().Where(x => x.ShiftID == i.ID).ToList();
            }
            return result4;
        }

        public ExtendShftEmp GetShftEmpData(int id)
        {
            var result4 = from shftemp in db.Shift
                          orderby shftemp.ID

                          select new ExtendShftEmp
                          {
                              ID = shftemp.ID,
                              Date = shftemp.Date,
                              StartTime = shftemp.StartTime,
                              EndTime = shftemp.EndTime

                          };
            return result4.Where(x => x.ID == id).First();
        }

        public int CreateNewShftEmp(Shift s)
        {
            db.Shift.Add(s);

            db.SaveChanges();

            return s.ID;
        }


    }
}