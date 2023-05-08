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
    public class EmpshiftController : ApiController
    {
        static ShiftBL shiftBL = new ShiftBL();
        // GET: api/empshift
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/empshift/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/empshift
        public int Post(Shift s)
        {
            return shiftBL.AddShift(s);

        }

        // PUT: api/empshift/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/empshift/5
        public void Delete(int id)
        {
        }
    }
}
