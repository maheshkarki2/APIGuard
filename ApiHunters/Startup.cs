using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ApiHunters.Startup))]
namespace ApiHunters
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
