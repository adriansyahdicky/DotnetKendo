using AGILIS_Logic.BusinessLogic;
using AGILIS_Logic.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace AGILIS.Controllers
{
    public class EmployeesController : Controller
    {
        public readonly EmployeesLogic _employeesLogic;

        public EmployeesController()
        {
            _employeesLogic = new EmployeesLogic();
        }

        // GET: Employees
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> GetEmployees(int page, int pageSize, int skip)
        {
            try
            {
                var data_raw = await _employeesLogic.getListEmployees();
                var data_count = data_raw.Count();
                var data_paging = data_raw.Skip(skip).Take(pageSize).AsEnumerable().ToList();

                var JsonResult = Json(new { data = data_paging, total_rows = data_count }, JsonRequestBehavior.AllowGet);

                JsonResult.MaxJsonLength = Int32.MaxValue;
                return JsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<ActionResult> GetDepartments()
        {
            try
            {
                var data = await _employeesLogic.getParamCombo(1, null);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<ActionResult> GetJobTitles(string DeptId)
        {
            try
            {
                var data = await _employeesLogic.getParamCombo(2, DeptId);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateEmployee(RequestEmployee requestEmployee)
        {
            try
            {

                await _employeesLogic.ActionCRUD(requestEmployee, 2);

                return Json(new { status = "success", title = "Save Employee Success.", text = "" });

            }
            catch (Exception ex)
            {
                return Json(new { status = "failed", title = "Save Employee Failed", text = ex.Message.ToString() });
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult> UpdateEmployee(RequestEmployee requestEmployee)
        {
            try
            {

                await _employeesLogic.ActionCRUD(requestEmployee, 3);

                return Json(new { status = "success", title = "Update Employee Success.", text = "" });

            }
            catch (Exception ex)
            {
                return Json(new { status = "failed", title = "Update Employee Failed", text = ex.Message.ToString() });
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult> DeleteEmployee(RequestEmployee requestEmployee)
        {
            try
            {

                await _employeesLogic.ActionCRUD(requestEmployee, 4);

                return Json(new { status = "success", title = "Delete Employee Success.", text = "" });

            }
            catch (Exception ex)
            {
                return Json(new { status = "failed", title = "Delete Employee Failed", text = ex.Message.ToString() });
                throw;
            }
        }
    }
}