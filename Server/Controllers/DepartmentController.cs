using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Project1.Models;
using System.Web.Http.Cors;

namespace Project1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DepartmentController : ApiController
    {
        private static DepartmentBL depaBL = new DepartmentBL();
        // GET: api/Department
        public List<DepWithEmp> Get()
        {
            return depaBL.GetDepartments();
        }

      
        // GET: api/Department/5
        public DepWithEmp Get(int id)
        {
            return depaBL.GetDepartment(id);
        }

        // POST: api/Department
        public string Post(Department dep)
        {
            int id = depaBL.AddDepartment(dep);
            return "Created with ID :" + id;
        }

        // PUT: api/Department/5
        public string Put(int id, Department dep)
        {
            depaBL.UpdateDepartment(dep,id);
            return "Department updated!";
        }

        // DELETE: api/Department/5
        public string Delete(int id)
        {
            depaBL.DeleteDepartmen(id);
            return "Department Deleted!";
        } 
    }
}
