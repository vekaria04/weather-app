using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AngularApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryController : ControllerBase
    {
        private static readonly List<string> _history = new();

        [HttpGet]
        public IActionResult GetHistory()
        {
            return Ok(_history);
        }

        [HttpPost]
        public IActionResult AddToHistory([FromBody] CitySearch request)
        {
            if (!string.IsNullOrWhiteSpace(request.City))
            {
                _history.Insert(0, request.City);
            }
            return Ok();
        }

        public class CitySearch
        {
            public string City { get; set; } = string.Empty;
        }
    }
}
