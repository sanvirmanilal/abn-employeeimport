using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ABN.Data.EF;
using ABN.Data.EF.Models;

namespace ABN.Data.Dal
{
    public class EmployeeDAL : IRepository<Employee>
    {
        private ABNEmployeeCRMContext db = new ABNEmployeeCRMContext();

        public async void Create(Employee employee)
        {
            await db.Employee.AddAsync(employee);
            await db.SaveChangesAsync();
        }
        
        public async void Update(Employee employee)
        {
            db.Entry(employee).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task<Employee> Get(int id)
        {
            Employee student = await db.Employee.FindAsync(id);
            return student;
        }

        public async void Delete(int id)
        {
            Employee employee = await db.Employee.FindAsync(id);
            db.Employee.Remove(employee);
            db.SaveChanges();
        }

        public async Task<IEnumerable<Employee>> GetAll()
        {
            return await db.Employee.ToListAsync();
        }
    }
}

