namespace server.Services;

public interface IRepository<T>
{
    Task<List<T>> GetAsync();

    Task<T?> GetAsync(string id);

    Task CreateAsync(T newDriver);

    Task UpdateAsync(string id, T updatedDriver);

    Task RemoveAsync(string id);
}