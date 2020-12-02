using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGILIS_Logic.ViewModels
{
    public class EmployeesViewModel
    {
        public Int64 ID { get; set; }
        public string FirtsName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string PlaceOfBirth { get; set; }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string JobTitleID { get; set; }
        public string DepartID { get; set; }
        public string DepartmentName { get; set; }
        public string JobTitleName { get; set; }
        public string HireDate { get; set; }
        public string NIK { get; set; }
    }

    public class ParamEmployeCombo
    {
        public Int64 ID { get; set; }
        public string PARAM_DESC { get; set; }
    }

    public class RequestEmployee
    {
        public Int64 ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NIK { get; set; }
        public string Department { get; set; }
        public string JobTitle { get; set; }
        public string PlaceOfBirth { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string HiresDate { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}
