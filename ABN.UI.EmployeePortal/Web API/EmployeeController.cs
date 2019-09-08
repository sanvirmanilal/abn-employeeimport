using System.Collections.Generic;
using System.Threading.Tasks;
using ABN.Data.Dal;
using ABN.Data.EF.Models;
using Microsoft.AspNetCore.Mvc;

namespace ABN.EmployeePortal.Web_API
{
    public class EmployeeController : Controller
    {
        private IRepository<Employee> _repository;

        public EmployeeController()
        {
            _repository = new EmployeeDAL();
        }

        [HttpGet]
        [Route("api/Employee/Index")]
        public async Task<IEnumerable<Employee>> Index()
        {
            return  await _repository.GetAll();
        }
        [HttpPost]
        [Route("api/Employee/Create")]
        public void Create(Employee Employee)
        {
            _repository.Create(Employee);
        }
        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public async Task<Employee> Details(int id)
        {
            var employee = await _repository.Get(id);
            return employee;
        }
        [HttpPut]
        [Route("api/Employee/Edit")]
        public void Edit(Employee Employee)
        {
            _repository.Update(Employee);
        }
        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}
