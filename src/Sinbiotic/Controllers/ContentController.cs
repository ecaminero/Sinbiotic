using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Sinbiotic.Models.Interface;
using Sinbiotic.Models.Dtos;
using Newtonsoft.Json;


namespace Sinbiotic.Controllers
{
    [Route("api/[controller]")]
    public class ContentController : Controller
    {
        private readonly IContent _accessProvider; 
        public ContentController(IContent accessProvider)
        {
            _accessProvider = accessProvider;
        }

        // GET api/content
        [HttpGet]
        public ActionResult GetList()
        {
           var notificationList = _accessProvider.GetContentList();
           return Json(new {data=notificationList, message="Message"});
        }

        // GET api/content/5
        [HttpGet("{id}")]
        public ActionResult Get(long Id)
        {
            var notification = _accessProvider.GetContent(Id);
            if (notification == null){
                return NotFound(new {message= "El objeto no existe"});
            }
            return Json(new {data=notification});
        }

        // POST api/content
        [HttpPost]
        public ActionResult Post([FromBody]Content data)
        {
           var notification = _accessProvider.AddContent(data);
            if (notification == null){
                return BadRequest(new {message= "Error al realizar la operación"});
            }
           return Json(new {data=notification, message="Se ha creado correctamente la Notificación"});
        }

        // PUT api/content/5
        [HttpPut("{id}")]
        public ActionResult Put(long id, [FromBody]Content data)
        {
            var notification = _accessProvider.UpdateContent(id, data);
            if (notification == null){
                return NotFound(new {message= "El objeto no existe"});
            }
            return Json(new {data=notification, message="Se ha actualizado correctamente la Notificación"});
        }

        // DELETE api/content/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int Id)
        {
            var success = _accessProvider.DeleteContent(Id);
            if (!success){
                return NotFound(new {message= "El objeto no existe"});
            }
            return Json(new {message="Se ha eliminado correctamente la Notificación"});
        }
    }
}
