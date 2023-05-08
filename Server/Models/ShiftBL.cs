using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class ShiftBL
    {

        private ProjectDBEntities db = new ProjectDBEntities();

        public List<ExtendShift> GetShifts()

        {
            var result3 = from emp in db.Employee
                          join emps in db.EmployeeShift on emp.ID equals emps.EmployeeID
                          join shft in db.Shift on emps.ShiftID equals shft.ID
                          orderby shft.ID
                          select new ExtendShift
                          {
                              ID = shft.ID,
                              EmployeeID = emps.EmployeeID,
                              FirstName = emp.FirstName,
                              LastName = emp.LastName,
                              ShiftID = emps.ShiftID,
                              Date = shft.Date,
                              StartTime = shft.StartTime,
                              EndTime = shft.EndTime
                          };
            return result3.ToList();
        }


        public ExtendShift GetShiftData(int id)
        {
            var result3 = from emp in db.Employee
                          join emps in db.EmployeeShift on emp.ID equals emps.EmployeeID
                          join shft in db.Shift on emps.ShiftID equals shft.ID
                          orderby shft.ID
                          select new ExtendShift
                          {
                              ID = shft.ID,
                              EmployeeID = emps.EmployeeID,
                              FirstName = emp.FirstName,
                              LastName = emp.LastName,
                              ShiftID = emps.ShiftID,
                              Date = shft.Date,
                              StartTime = shft.StartTime,
                              EndTime = shft.EndTime
                          };

            return result3.Where(x => x.ID == id).First();
        }
        public int AddShift(Shift shift)
        {
            db.Shift.Add(shift);
            db.SaveChanges();
            return shift.ID;
        }

        public void UpdateShift(Shift shift, int id)
        {
            Shift sh = db.Shift.Where(x => x.ID == id).First();
            sh.ID = shift.ID;
            sh.Date = shift.Date;
            sh.StartTime = shift.StartTime;
            sh.EndTime = shift.EndTime;
            db.SaveChanges();
        }

        public void DeleteShift(int id)
        {
            Shift sh = db.Shift.Where(x => x.ID == id).First();
            db.Shift.Remove(sh);
            db.SaveChanges();

        }

    }
}