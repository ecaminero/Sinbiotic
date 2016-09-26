using Microsoft.AspNetCore.Mvc;

namespace Sinbiotic.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}