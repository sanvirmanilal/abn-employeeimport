using ABN.Data.EF;
using ABN.Data.EF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;

namespace ABN.Data.Tests
{
    [TestClass]
    public class EmployeeTests
    {
        private ABNEmployeeCRMContext _employeeDBContext;
        private List<Employee> _newEmployees;

        [TestInitialize]
        public void SetupData()
        {
            // Seed the database with 20 employees 
            int _numberOfEmployees = 20;
            _employeeDBContext = new ABNEmployeeCRMContext();
            _newEmployees = new List<Employee>();

            for (int i = 0; i < _numberOfEmployees; i++)
            {
                _newEmployees.Add(new Employee
                {
                    Id = 0,
                    Age = i + 20,
                    FirstName = $"FirstName {i}",
                    LastName = $"LastName {i}",
                    LengthOfEmployment = (i + 1) * 0.5m
                });
            }

            _employeeDBContext.Employee.AddRangeAsync(_newEmployees);
            _employeeDBContext.SaveChanges();
        }

        [DataTestMethod]
        [DataRow(21, 1.5, 50000.00)]
        [DataRow(32, 5.0, 90000.00)]
        [DataRow(55, 10.0, 150000.00)]
        public void udf_CalculateEmployeeSalary_ValidInput_Success(int age, double lengthOfEmployment, double expectedSalary)
        {
            // ACT
            var result = _employeeDBContext.Employee
                .Select(x => new { x.Id, Salary = ABNEmployeeCRMContext.CalculateEmployeeSalary(age, decimal.Parse(lengthOfEmployment.ToString())) }).FirstOrDefault();

            // ASSERT
            Assert.AreEqual(decimal.Parse(expectedSalary.ToString()), result.Salary);
            
        }

        [TestMethod]
        public void sp_UpdateNewEmployeeSalaries_ValidInput_Success()
        {
            // ARRANGE
            Assert.IsTrue(_employeeDBContext.Employee.Any(x => !x.Salary.HasValue));

            // ACT
            _employeeDBContext.Database.ExecuteSqlCommand("sp_UpdateNewEmployeeSalaries");

            // ASSERT
            Assert.IsFalse(_employeeDBContext.Employee.Any(x => !x.Salary.HasValue));
        }

        [TestCleanup]
        public void Cleanup()
        {
            // Delete the temp employees created for testing purposes
            _employeeDBContext.RemoveRange(_newEmployees);
            _employeeDBContext.SaveChanges();
        }
    }
}
