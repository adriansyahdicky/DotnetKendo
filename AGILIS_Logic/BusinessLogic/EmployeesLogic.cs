using AGILIS_Logic.Models;
using AGILIS_Logic.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static AGILIS_Logic.GlobalFunction.CommonFunction;

namespace AGILIS_Logic.BusinessLogic
{
    public class EmployeesLogic
    {
        public async Task<List<EmployeesViewModel>> getListEmployees()
        {
            var data = new List<EmployeesViewModel>();

            try
            {
                using (var db = new AgilisDBContext())
                {
                    SqlParameter[] prm = new SqlParameter[]
                    {
                            new SqlParameter("@Action", SqlDbType.Int) { Value = 1 }

                    };
                    data = await db.Database.SqlQuery<EmployeesViewModel>(DbHelper.GenerateCommandText("usp_Employees", prm), prm).ToListAsync();
                }

            }
            catch (Exception ex)
            {
                throw;
            }

            return data;
        }


        public async Task<List<ParamEmployeCombo>> getParamCombo(int action, string DeptId)
        {
            var data = new List<ParamEmployeCombo>();

            try
            {
                using (var db = new AgilisDBContext())
                {
                    SqlParameter[] prm = new SqlParameter[]
                    {
                       new SqlParameter("@Action", SqlDbType.Int) { Value = action },
                       new SqlParameter("@DeptId", SqlDbType.NVarChar) { Value = DeptId == null ? "" : DeptId }
                    };
                    data = await db.Database.SqlQuery<ParamEmployeCombo>(DbHelper.GenerateCommandText("usp_EmployeesCombo", prm), prm).ToListAsync();
                }

            }
            catch (Exception ex)
            {
                throw;
            }

            return data;
        }

        public async Task ActionCRUD(RequestEmployee data, int action)
        {
            
                try
                {
                    using (var db = new AgilisDBContext())
                    {
                        SqlParameter[] prm = new SqlParameter[]
                        {
                            new SqlParameter("@Action", SqlDbType.Int) { Value = action },
                            new SqlParameter("@Nik", SqlDbType.NVarChar) { Value = data.NIK == null ? "" : data.NIK},
                            new SqlParameter("@FirtsName", SqlDbType.NVarChar) { Value = data.FirstName == null ? "" : data.FirstName},
                            new SqlParameter("@LastName", SqlDbType.NVarChar) { Value = data.LastName == null ? "": data.LastName},
                            new SqlParameter("@Address", SqlDbType.NVarChar) { Value = data.Address == null ? "" : data.Address},
                            new SqlParameter("@Gender", SqlDbType.NVarChar) { Value = data.Gender == null ? "" :data.Gender },
                            new SqlParameter("@PlaceOfBirth", SqlDbType.NVarChar) { Value = data.PlaceOfBirth == null ? "":data.PlaceOfBirth},
                            new SqlParameter("@DateOfBirth", SqlDbType.NVarChar) { Value = data.DateOfBirth == null ? "" : data.DateOfBirth},
                            new SqlParameter("@Email", SqlDbType.NVarChar) { Value = data.Email == null ? "" : data.Email},
                            new SqlParameter("@Phone", SqlDbType.NVarChar) { Value = data.Phone == null ? "" : data.Phone},
                            new SqlParameter("@JobTitleID", SqlDbType.NVarChar) { Value = data.JobTitle == null ? "" : data.JobTitle},
                            new SqlParameter("@HireDate", SqlDbType.NVarChar) { Value = data.HiresDate == null ? "" : data.HiresDate},
                            new SqlParameter("@DepartID", SqlDbType.NVarChar) { Value = data.Department == null ? "" : data.Department},
                            new SqlParameter("@IdEmployee", SqlDbType.BigInt) { Value = data.ID }
                        };
                        await db.Database.ExecuteSqlCommandAsync(DbHelper.GenerateCommandText("usp_Employees", prm), prm);
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }
        }
    }
}
