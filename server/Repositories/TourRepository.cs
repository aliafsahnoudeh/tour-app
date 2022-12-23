using server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver.Linq;

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
        var query = from tour in _toursCollection.AsQueryable()
            join driver in _driverCollection.AsQueryable() on
                tour.driver_id equals driver._id
            select new
            {
                _id = tour._id,
                CustomerName = tour.CustomerName,
                ShipmentDate= tour.ShipmentDate,
                LocationFrom = tour.LocationFrom,
                LocationTo = tour.LocationTo,
                Driver = driver
            };

        var list = query.ToList();
        List<TourModel> result = new List<TourModel>();
        for(int i=0; i < list.Count; i++) {
            result.Add(new TourModel {
                CustomerName = list[i].CustomerName,
                ShipmentDate =  list[i].ShipmentDate,
                LocationFrom =  list[i].LocationFrom,
                LocationTo = list[i].LocationTo,
                Driver = list[i].Driver,
                _id = list[i]._id
            });
        }

        return result;
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