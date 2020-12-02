using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGILIS_Logic.Models
{
    public partial class AgilisDBContext : DbContext
    {
        public AgilisDBContext()
            : base("name=AGILISDB")
        {
        }
    }
}
