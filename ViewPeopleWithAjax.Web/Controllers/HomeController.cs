using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ViewPeopleWithAjax.Data;
using ViewPeopleWithAjax.Web.Models;

namespace ViewPeopleWithAjax.Web.Controllers
{
    public class HomeController : Controller
    {
    private string _connectionString =
            @"Data Source=.\sqlexpress;Initial Catalog=MyFirstDb;Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
            return Json(person);
        }
        [HttpPost]
        public IActionResult EditPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(person);
            return Json(person);
        }
        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(id);
        }
    }

}

