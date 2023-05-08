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

    public class EmployeeController : ApiController
    {
        private static EmployeeBL empBL = new EmployeeBL();

        // GET: api/Employee
        public IEnumerable  <ExtendEmp> Get()
        {
            return empBL.GetEmployees();
        }
        

      
            // GET: api/Employee/5
            public ExtendEmp Get(int id)
        {
            return empBL.GetEmployee(id);
        }

        // POST: api/Employee
        public string Post(Employee emp)
        {
            int id = empBL.AddEmployee(emp);
            return "Created with ID :" + id;
        }

        // PUT: api/Employee/5
        public string Put(int id,Employee emp )
        {
            empBL.UpdateEmployee(emp,id);
            return "Employee updated!";
        }

        // DELETE: api/Employee/5
        public string Delete(int id)
        {
            empBL.DeleteEmployee(id);
            return "Employee Deleted!";
        }
    }
}
