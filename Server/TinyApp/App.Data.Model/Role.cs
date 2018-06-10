using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace App.Data.Model
{
    public class Role : IdentityRole, IEntity<string>
    {
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }
}
