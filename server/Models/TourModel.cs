using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class TourModel : BaseModel, ITour
    {
        public string? CustomerName { get; set; }
        // TODO proper Date
        public string? ShipmentDate { get; set; }
        public string? LocationFrom { get; set; }
        public string? LocationTo { get; set; }

        [JsonIgnore]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId driver_id { get; set; }

        public virtual IDriver? Driver { get; set; }

        public string DriverId
        {
            get { return Convert.ToString(driver_id); }
            set { driver_id = MongoDB.Bson.ObjectId.Parse(value); }
        }
    }
}