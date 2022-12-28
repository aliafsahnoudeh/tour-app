using System;
using Xunit;
using server.Controllers;
using server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ServerTests;

public class DriverControllerTest
{
    [Fact]
    public async void GetAllDrivers()
    {
        var driverController = new DriverController(null, new MockedDriverRepository());
        var drivers = await driverController.Get();
        Assert.Equal(0, drivers.Count());
    }

    [Fact]
    public async void GetReturnsNotFound()
    {
        var driverController = new DriverController(null, new MockedDriverRepository());
        var actionResult = await driverController.Get("some_id");
        
        Assert.IsType<NotFoundResult>(actionResult.Result);
    }
}