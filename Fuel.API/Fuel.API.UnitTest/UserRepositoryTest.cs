using System;
using System.Collections.Generic;
using Fuel.API.Data;
using Fuel.API.Dtos;
using Fuel.API.Models;
using Moq;
using NUnit.Framework;

namespace Fuel.API.UnitTest
{
    [TestFixture]
    public class UserRepositoryTest
    {
     
        //This method test the calculation business logic of suggested price method in UserRepository class
        [TestCase(1.785, 10,"2020-02-02", true, "NY")]
        [TestCase(1.77,150,"2020-07-20", true, "TX")]
        [TestCase(1.8,20000,"2020-09-12", false, "CA")]
        public void CalculatePriceTest_ExpectedlValue(double actual, double gallonsRequested, string deliveryDate, bool hasQuoteBefore, string state) {
            // Arrange: Create a new client Profile
            var listQuote = new List<Quote>();
            var user = new User() {
                UserId =1,
                Username = "username",
                ClientProfile = new ClientProfile() {
                    State = state
                }};
            var quote = new Quote() {
                Id =1
            };
            if (hasQuoteBefore)
            {
                user.Quote = ProfileControllerTest.GetQuote();
            }; 
            IUserRepository _repo = new UserRepository();
            var quoteForGenerationDto = new QuoteForDetailedDto();
            quoteForGenerationDto.GallonsRequested = gallonsRequested;
            quoteForGenerationDto.DeliveryDate = Convert.ToDateTime(deliveryDate);
            // Action : calculate using the method 
            var expected = _repo.CalculatePrice(user,quoteForGenerationDto);
            //Assert : compares the calculated suggested prices with the actual value. 
            Assert.AreEqual(actual,expected);
        }
    }
}