using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project1.Models;

namespace Project1.Models
{
    public class EmployeeBL
    {
        private ProjectDBEntities db = new ProjectDBEntities();
        ShiftBL shiftBL = new ShiftBL();

        public List<ExtendEmp> GetEmployees()

        {
            var result2 = (from emp in db.Employee
                           join dep in db.Department on emp.DepartmentID equals dep.ID
                           orderby emp.ID

                           select new ExtendEmp
                           {
                               ID = emp.ID,
                               FirstName = emp.FirstName,
                               LastName = emp.LastName,
                               StartWorkYear = emp.StartWorkYear,
                               Name = dep.Name,
                               DepartmentID = emp.DepartmentID,
                               Manager = dep.Manager,

                           }).ToList();
            foreach (var i in result2)
            {
                i.ExtendShiftz = shiftBL.GetShifts().Where(x => x.EmployeeID == i.ID).ToList();
            }
            return result2;
        

        }
       

        public ExtendEmp GetEmployee(int id)
        {
            var emp = GetEmployees();
            return emp.Where(x => x.ID == id).First(); 
        }
        public int AddEmployee(Employee emp)
        {
            db.Employee.Add(emp);
            db.SaveChanges();
            return emp.ID;
        }

        public void UpdateEmployee(Employee emp, int id)
        {
            Employee e = db.Employee.Where(x => x.ID == id).First();
            e.FirstName = emp.FirstName;
            e.LastName = emp.LastName;
            e.DepartmentID = emp.DepartmentID;
            db.SaveChanges();
        }

        public void DeleteEmployee(int id)
        {
            var eid = db.Employee.Where(d => d.ID == id).First();
            db.Employee.Remove(eid);


            var sid = db.EmployeeShift.Where(x => x.EmployeeID == id);

            foreach (var x in sid)
            {
                db.EmployeeShift.Remove(x);
            };



            db.SaveChanges();
        }
    }



    }


