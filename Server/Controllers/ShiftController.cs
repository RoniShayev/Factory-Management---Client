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
    public class ShiftController : ApiController
    {
         static empshftBL sftBL = new empshftBL();
        ShiftBL shiBL = new ShiftBL();

        // GET: api/Shift
        public IEnumerable<ExtendShftEmp> Get()

        {
            return sftBL.GetShftEmpDatas();
        }


        // GET: api/Shift/5
        public ExtendShftEmp Get(int id)
        {
            return sftBL.GetShftEmpData(id);
        }

        // POST: api/Shift
        public int Post(Shift s)
        {
            return sftBL.CreateNewShftEmp(s);

        }

        // PUT: api/Shift/5
        public string Put(int id, Shift shi)
        {
            shiBL.UpdateShift(shi, id);
            return "Shift updated!";
        }

        // DELETE: api/Shift/5
        public string Delete(int id)
        {
            shiBL.DeleteShift(id);
            return "Shift Deleted!";
        }
    }
}
