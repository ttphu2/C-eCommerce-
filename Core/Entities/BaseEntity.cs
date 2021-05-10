using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        // [Column("CreatedBy")]
        // [Display(Name = "Creator")]
        // public string CreatedBy { get; set; }

        // [Column("ModifiedBy")]
        // [Display(Name = "Modifier")]
        // public string ModifiedBy { get; set; }   
    }
}