using System;

namespace App.Data.Exeptions
{
    public class PaginationException : Exception
    {
        public PaginationException()
        {
        }

        public PaginationException(string message) : base(message)
        {
        }
    }
}
