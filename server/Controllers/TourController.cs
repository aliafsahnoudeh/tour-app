using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class TourController : ControllerBase
{
    private readonly ILogger<TourController> _logger;
    private readonly IRepository<TourModel> _repository;

    public TourController(ILogger<TourController> logger, IRepository<TourModel> repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpGet(Name = "GetTours")]
    public async Task<IEnumerable<TourModel>> Get()
    {
        return await _repository.GetAsync();
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<TourModel>> Get(string id)
    {
        var tour = await _repository.GetAsync(id);

        if (tour is null)
        {
            return NotFound();
        }

        return Ok(tour);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TourModel newTour)
    {
        await _repository.CreateAsync(newTour);

        return CreatedAtAction(nameof(Get), new { id = newTour.Id }, newTour);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, TourModel updatedTour)
    {
        var tour = await _repository.GetAsync(id);

        if (tour is null)
        {
            return NotFound();
        }

        updatedTour.Id = tour.Id;

        await _repository.UpdateAsync(id, updatedTour);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var tour = await _repository.GetAsync(id);

        if (tour is null)
        {
            return NotFound();
        }

        await _repository.RemoveAsync(id);

        return NoContent();
    }
}
