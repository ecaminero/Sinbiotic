using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Sinbiotic.Models.Dtos
{
    public class OrganizationalUnit
    {
        [Required]
        public int Id { get; }
        [Required]
        public string Name { get; set; }
        public DateTime Created { get; }
        public DateTime Modified { get; set; }

    }
}