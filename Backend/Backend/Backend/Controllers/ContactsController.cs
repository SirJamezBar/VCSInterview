using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {

        private readonly ILogger<ContactsController> _logger;

        public ContactsController(ILogger<ContactsController> logger)
        {
            _logger = logger;
        }
        [HttpGet("/getAll")]
        [Authorize]
        public List<Contact> GetAll(int pageNo, int pageSize)
        {
            ContactRepository contactRepo = new ContactRepository();
            List<Contact> result = contactRepo.getAll(pageNo,pageSize);
            return result;
        }

        [HttpGet("/getCount")]
        [Authorize]
        public int GetCount()
        {
            ContactRepository breakdownRepository = new ContactRepository();
            int result = breakdownRepository.getCount();
            return result;
        }

        [HttpPost("/addContact")]
        public void Post(Contact contact)
        {
            ContactRepository contactRepository = new ContactRepository();
            contactRepository.post(contact);


        }

        [HttpPost("/updateContact")]
        [Authorize]
        public void Update( Contact contact)
        {
            ContactRepository contactRepository = new ContactRepository();
            contactRepository.update(contact.Id, contact);

        }

        [HttpDelete("/deleteContact")]
        [Authorize]
        public void Delete(int id)
        {
            ContactRepository contactRepository = new ContactRepository();
            contactRepository.delete(id);

        }
    }
}