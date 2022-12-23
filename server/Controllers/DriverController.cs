using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class DriverController : ControllerBase
{
    private readonly ILogger<DriverController> _logger;
    private readonly IRepository<DriverModel> _repository;

    public DriverController(ILogger<DriverController> logger, IRepository<DriverModel> repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpGet(Name = "GetDrivers")]
    public async Task<IEnumerable<DriverModel>> Get()
    {
        return await _repository.GetAsync();
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<DriverModel>> Get(string id)
    {
        var driver = await _repository.GetAsync(id);

        if (driver is null)
        {
            return NotFound();
        }

        return Ok(driver);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] DriverModel newDriver)
    {
        await _repository.CreateAsync(newDriver);

        return CreatedAtAction(nameof(Get), new { id = newDriver.Id }, newDriver);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, DriverModel updatedDriver)
    {
        var driver = await _repository.GetAsync(id);

        if (driver is null)
        {
            return NotFound();
        }

        updatedDriver.Id = driver.Id;

        await _repository.UpdateAsync(id, updatedDriver);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var driver = await _repository.GetAsync(id);

        if (driver is null)
        {
            return NotFound();
        }

        await _repository.RemoveAsync(id);

        return NoContent();
    }
}
