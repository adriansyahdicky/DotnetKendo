﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGILIS_Logic.GlobalFunction
{
    public class CommonFunction
    {
        public class DbHelper
        {
            public static string GenerateCommandText(string storedProcedure, SqlParameter[] parameters)
            {
                string CommandText = "EXEC {0} {1}";
                string[] ParameterNames = new string[parameters.Length];

                for (int i = 0; i < parameters.Length; i++)
                {
                    ParameterNames[i] = parameters[i].ParameterName;
                }

                return string.Format(CommandText, storedProcedure, string.Join(",", ParameterNames));
            }
        }

    }
}
