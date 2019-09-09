using ABN.Data.EF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

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

        [DbFunction("udf_CalculateEmployeeSalary", "dbo")]
        public static decimal CalculateEmployeeSalary(int age, decimal lengthOfEmployment) => throw new NotImplementedException();

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
           
            modelBuilder
               .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
               .HasAnnotation("Relational:MaxIdentifierLength", 128)
               .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ABN.Data.EF.Models.Employee", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<int?>("Age");

                b.Property<string>("FirstName")
                    .HasMaxLength(255);

                b.Property<string>("LastName")
                    .HasMaxLength(255);

                b.Property<decimal?>("LengthOfEmployment")
                    .HasColumnType("decimal(5, 2)");

                b.Property<decimal?>("Salary")
                    .HasColumnType("money");

                b.HasKey("Id");

                b.ToTable("Employee");
            });
        }
    }
}
