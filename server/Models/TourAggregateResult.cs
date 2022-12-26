using System.Linq.Expressions;

namespace server.Models
{
    public class TourAggregateResult : TourModel
    {
        public DriverModel[] Drivers { get; set; }
        
        public static Expression<Func<TourAggregateResult, TourModel>> ToTourModel => c =>
            new TourModel
            {
                _id = c._id,
                CustomerName = c.CustomerName,
                ShipmentDate = c.ShipmentDate,
                LocationFrom = c.LocationFrom,
                LocationTo = c.LocationTo,
                Driver = c.Drivers.First()
            };
    }
}