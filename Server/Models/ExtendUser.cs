using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project1.Models
{
    public class ExtendUser
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public int Password { get; set; }
        public int NumOfAction { get; set; }
    }
}