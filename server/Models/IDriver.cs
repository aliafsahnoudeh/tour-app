namespace server.Models
{
    public interface IDriver
    {
        string Id { get; }
        string? FirstName { get; }
        string? LastName { get; }
        string Location { get; }
    }
}