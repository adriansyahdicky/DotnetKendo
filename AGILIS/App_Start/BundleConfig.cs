using System.Web;
using System.Web.Optimization;

namespace AGILIS
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/Js").Include(
                     "~/Content/plugins/jQuery/jquery-3.3.1.min.js",
                      "~/Content/bootstrap/js/bootstrap.min.js",
                       "~/Content/plugins/slimScroll/jquery.slimscroll.min.js",
                        "~/Content/plugins/fastclick/fastclick.js",
                        "~/Content/dist/js/app.min.js",
                        "~/Content/dist/js/demo.js"
                     ));

            bundles.Add(new StyleBundle("~/Css").Include(
                      "~/Content/bootstrap/css/bootstrap.min.css",
                      "~/Content/dist/css/AdminLTE.min.css",
                      "~/Content/dist/css/skins/_all-skins.min.css",
                      "~/Content/font-awesome.min.css"
                      ));

            BundleTable.EnableOptimizations = true;

            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Content/plugins/jQuery/jquery-3.3.1.min.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));


            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));
        }
    }
}
