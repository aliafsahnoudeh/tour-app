using server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace server.Services;

public class DriverRepository : IDriverRepository
{
    private readonly IMongoCollection<DriverModel> _driversCollection;

    public DriverRepository(
        IOptions<TourAppDatabaseSettings> tourAppDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            tourAppDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            tourAppDatabaseSettings.Value.DatabaseName);

        _driversCollection = mongoDatabase.GetCollection<DriverModel>(
            tourAppDatabaseSettings.Value.DriversCollectionName);
    }

    public async Task<List<DriverModel>> GetAsync() =>
        await _driversCollection.Find(_ => true).ToListAsync();

    public async Task<List<DriverModel>> GetByLocationAsync(string location) =>
        await _driversCollection.Find(x => x.Location == location).ToListAsync();

    public async Task<DriverModel?> GetAsync(string id) =>
        await _driversCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(DriverModel newDriver) =>
        await _driversCollection.InsertOneAsync(newDriver);

    public async Task UpdateAsync(string id, DriverModel updatedDriver) =>
        await _driversCollection.ReplaceOneAsync(x => x.Id == id, updatedDriver);

    public async Task RemoveAsync(string id) =>
        await _driversCollection.DeleteOneAsync(x => x.Id == id);
}