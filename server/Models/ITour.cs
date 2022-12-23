namespace server.Models
{
    public interface ITour
    {
        string Id { get; }
        string? CustomerName { get; }
        string? ShipmentDate { get; }
        string? LocationFrom { get; }
        string? LocationTo { get; }
        IDriver? Driver { get; }
    }
}