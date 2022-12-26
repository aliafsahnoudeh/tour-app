using server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;

namespace server.Services;

public class TourRepository : IRepository<TourModel>
{
    private readonly IMongoCollection<TourModel> _toursCollection;
    private readonly IMongoCollection<DriverModel> _driverCollection;

    public TourRepository(
        IOptions<TourAppDatabaseSettings> tourAppDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            tourAppDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            tourAppDatabaseSettings.Value.DatabaseName);

        _toursCollection = mongoDatabase.GetCollection<TourModel>(
            tourAppDatabaseSettings.Value.ToursCollectionName);
        _driverCollection = mongoDatabase.GetCollection<DriverModel>(
            tourAppDatabaseSettings.Value.DriversCollectionName);
    }

    public async Task<List<TourModel>> GetAsync()  {
         var tours = _toursCollection
                    .Aggregate()
                    .Lookup<TourModel, DriverModel, TourAggregateResult>(
                        _driverCollection, 
                        c => c.driver_id,
                        c => c._id,
                        c => c.Drivers)
                    .Project(TourAggregateResult.ToTourModel)
                    .ToList();

        Console.WriteLine(tours);
        
        return tours;
    }

    public async Task<TourModel?> GetAsync(string id) =>
        await _toursCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(TourModel newTour) =>
        await _toursCollection.InsertOneAsync(newTour);

    public async Task UpdateAsync(string id, TourModel updatedTour) =>
        await _toursCollection.ReplaceOneAsync(x => x.Id == id, updatedTour);

    public async Task RemoveAsync(string id) =>
        await _toursCollection.DeleteOneAsync(x => x.Id == id);
}