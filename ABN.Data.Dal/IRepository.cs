using System.Collections.Generic;
using System.Threading.Tasks;

namespace ABN.Data.Dal
{
    public interface IRepository<T> where T : class, new()
    {
        void Create(T t);
        void Delete(int id);
        Task<IEnumerable<T>> GetAll();
        Task<T> Get(int id);
        void Update(T t);
    }
}