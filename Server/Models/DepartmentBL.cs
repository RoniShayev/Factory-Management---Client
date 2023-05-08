using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class DepartmentBL
    {
        private ProjectDBEntities db = new ProjectDBEntities();

        public List<DepWithEmp> GetDepartments()
        {
         
                var result = from dep in db.Department
                             join emp in db.Employee
                             on dep.Manager equals emp.ID
                             select new DepWithEmp
                             {
                                 ID = dep.ID,
                                 Name = dep.Name,
                                 Manager = dep.Manager,
                                 FirstName = emp.FirstName,
                                 LastName = emp.LastName,
                                 DepartmentID = emp.DepartmentID,


                             };

                return result.ToList();
           
        }

    

        public DepWithEmp GetDepartment(int id)
        {
        var result = from department in db.Department
                     join emp in db.Employee on department.Manager equals emp.ID
                     select new DepWithEmp
                     {
                         ID = department.ID,
                         Name = department.Name,
                         Manager = department.Manager,
                         FirstName = emp.FirstName,
                         LastName = emp.LastName,
                         DepartmentID = emp.DepartmentID,


                     };
        return result.Where(x => x.ID == id).First();
    }


        public int AddDepartment(Department dep)
        {
            db.Department.Add(dep);
            db.SaveChanges();
            return dep.ID;
        }

        public void UpdateDepartment(Department dep , int id)
        {
            Department d = db.Department.Where(x => x.ID == id).First();
            d.Name = dep.Name;
            d.Manager = dep.Manager;
            db.SaveChanges();
        }

        public void DeleteDepartmen(int id)
        {
            Department d = db.Department.Where(x => x.ID == id).First();
            db.Department.Remove(d);
            db.SaveChanges();

        }

    }
}