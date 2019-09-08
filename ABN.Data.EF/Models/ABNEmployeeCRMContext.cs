using ABN.Data.EF.Models;
using Microsoft.EntityFrameworkCore;

namespace ABN.Data.EF
{
    public partial class ABNEmployeeCRMContext : DbContext
    {
        public ABNEmployeeCRMContext()
        {
        }

        public ABNEmployeeCRMContext(DbContextOptions<ABNEmployeeCRMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employee { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=ABNEmployeeCRM;Integrated Security=True;Connect Timeout=30");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.LengthOfEmployment).HasColumnType("decimal(3, 2)");

                entity.Property(e => e.Salary).HasColumnType("money");
            });
        }
    }
}
