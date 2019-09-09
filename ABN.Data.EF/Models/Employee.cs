using System.ComponentModel.DataAnnotations.Schema;

namespace ABN.Data.EF.Models
{
    public partial class Employee
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Age { get; set; }
        public decimal? Salary { get; set; }
        public decimal? LengthOfEmployment { get; set; }
    }
}
