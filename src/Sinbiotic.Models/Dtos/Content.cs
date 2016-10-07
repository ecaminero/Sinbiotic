using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sinbiotic.Models.Dtos
{
    public class Content
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Tittle { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public DateTime StartedDate { get; set; }
        [Required]
        public DateTime ExpiredDate { get; set; }
        [Required]
        public string TextAlign { get; set; }
        [Required]
        public bool Global { get; set; }
        [Required]
        public int UserId { get; set;}
        [Required]
        public List<int> SendToId { get; }
        [Required]
        public List<int> UnitsId { get; }
        public DateTime Created { get; set; }
    }
}
