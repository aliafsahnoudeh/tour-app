using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class BaseModel
    {       
        [JsonIgnore]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }

        public string Id
        {
            get { return Convert.ToString(_id); }
            set { _id = MongoDB.Bson.ObjectId.Parse(value); }
        }

        public BaseModel()
        {
            _id = ObjectId.GenerateNewId();
        }
    }
}