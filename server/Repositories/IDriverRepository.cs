using server.Models;

namespace server.Services;

public interface IDriverRepository : IRepository<DriverModel>
{
    Task<List<DriverModel>> GetByLocationAsync(string location);
}