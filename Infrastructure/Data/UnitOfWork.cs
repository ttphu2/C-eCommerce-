using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
// Nguyên nhân sử dụng unit of work là vì :
// Khi save Orders thì cả hai repository sẽ cùng phải khởi tạo, và sử dụng trên đối tượng DbContext của riêng nó. 
// Điều này sẽ có rủi ro trong tương lai khi một trong 2 hàm SaveChange()
// ủa một trong 2 repository bị lỗi và cái kia thành công nên dữ liệu trong cơ sở dữ liệu sẽ bị sai.
namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable _repositories;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
           if(_repositories == null) _repositories = new Hashtable();
           var type= typeof(TEntity).Name;
           if(!_repositories.ContainsKey(type))
           {
               var repositoryType = typeof(GenericRepository<>);
               var repositoryInstance = Activator.CreateInstance(repositoryType
               .MakeGenericType(typeof(TEntity)), _context);
               _repositories.Add(type,  repositoryInstance);
           }
           return (IGenericRepository<TEntity>) _repositories[type];
        }
    }
}