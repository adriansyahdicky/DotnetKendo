using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;

namespace AGILIS.Config
{
    public static class UrlExtensions
    {
        public static string VersionedContent(this UrlHelper helper, string contentPath)
        {

            var context = helper.RequestContext.HttpContext;
            var physicalPath = context.Server.MapPath(contentPath);
            var version = @"v=" + new FileInfo(physicalPath).LastWriteTime.ToString(@"yyyyMMddHHmmss");
            var translatedContentPath = helper.Content(contentPath);

            var versionedContentPath =
                contentPath.Contains(@"?")
                    ? translatedContentPath + @"&" + version
                    : translatedContentPath + @"?" + version;

            if (context.Cache[contentPath] == null)
            {
                context.Cache.Add(physicalPath, version, null, DateTime.Now.AddMinutes(1), TimeSpan.Zero,
                    CacheItemPriority.Normal, null);
                context.Cache[contentPath] = versionedContentPath;
                return versionedContentPath;
            }
            else
            {
                if (context.Cache[contentPath].ToString() != versionedContentPath)
                {
                    context.Cache[contentPath] = versionedContentPath;
                }
                return context.Cache[contentPath] as string;
            }
        }
    }
}