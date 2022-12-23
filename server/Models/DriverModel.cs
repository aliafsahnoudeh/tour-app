namespace server.Models
{
    public class DriverModel : BaseModel
    {       
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        // TODO more accurate
        public string Location { get; set; }
    }
}