namespace ABN.Data.EF.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Age { get; set; }
        public decimal? Salary { get; set; }
        public decimal? LengthOfEmployment { get; set; }
    }
}
