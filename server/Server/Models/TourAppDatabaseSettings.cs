namespace server.Models;

public class TourAppDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string DriversCollectionName { get; set; } = null!;
    public string ToursCollectionName { get; set; } = null!;

}