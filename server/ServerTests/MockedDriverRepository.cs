using server.Models;
using server.Services;

namespace ServerTests;

public class MockedDriverRepository : IDriverRepository
{

    public async Task<List<DriverModel>> GetAsync() {
        return new List<DriverModel>();
    }

    public async Task<List<DriverModel>> GetByLocationAsync(string location) => null;

    public async Task<DriverModel?> GetAsync(string id) => null;

    public async Task CreateAsync(DriverModel newDriver) => new Task(null);

    public async Task UpdateAsync(string id, DriverModel updatedDriver) => new Task(null);

    public async Task RemoveAsync(string id) => new Task(null);
}