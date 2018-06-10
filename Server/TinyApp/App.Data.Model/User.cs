using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace App.Data.Model
{
    public class User : IdentityUser, IEntity<string>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }
}
