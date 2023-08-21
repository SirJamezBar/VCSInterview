using System.Data;
using Backend.Models;
using Npgsql;

namespace Backend.Repository
{
    public class ContactRepository
    {

        private NpgsqlDataSource dataSource;
        private async void Connection()
        {
            string connString = "host=127.0.0.1;Username=postgres;Password=admin;database=VSCInterview";
            dataSource = NpgsqlDataSource.Create(connString);

        }

        public List<Contact> getAll(int PageNo, int pageSize)
        {
            Connection();
            string query = "SELECT * FROM contacts";
            string q2 = "Select * From   (Select ROW_NUMBER() Over (Order by Id) AS RowNum, * FROM contacts)t  where t.RowNum Between ((" + PageNo + "-1)*"+pageSize+"+1) AND ("+PageNo+"*"+pageSize+")";
            List<Contact> result = new List<Contact>();

            var command = dataSource.CreateCommand(q2);
            var reader =  command.ExecuteReader();
                   
            DataTable data = new DataTable();
            data.Load(reader);
            foreach (DataRow row in data.Rows)
                    {
                        result.Add(new Contact
                        {
                            Id = (int)(row["id"]),
                            Name = (string)(row["name"]),
                            Surname =(string)(row["surname"]),
                            Telno=(string)(row["telno"]),
                            Email = (string)(row["email"]),
                            DateBirth = (DateTime)(row["datebirth"])
                        });
                    }
            dataSource.Dispose();
            return result;
        }

        public void post(Contact contact)
        {
            Connection();
            string query = "INSERT INTO contacts (name,surname,telno,email,datebirth)  VALUES('" + contact.Name + "','" + contact.Surname + "','" + contact.Telno + "','" + contact.Email + "','" + contact.DateBirth + "')";

            var command = dataSource.CreateCommand(query);
            command.ExecuteNonQuery();
            dataSource.Dispose();
        }

        public void update(int id, Contact contact)
        {
            Connection();

            string date = contact.DateBirth.ToShortDateString();
            string query = "UPDATE contacts SET name ='" +contact.Name+"',surname='"+ contact.Surname +"',telno='"+contact.Telno+"',email='"+ contact.Email+"',datebirth='"+date+"' WHERE id="+ contact.Id;

            var command = dataSource.CreateCommand(query);
            command.ExecuteNonQuery();
            dataSource.Dispose();
        }

        internal void delete(int id)
        {
            Connection();
            string query = "DELETE FROM contacts WHERE id=" + id;
            var command = dataSource.CreateCommand(query);
            command.ExecuteNonQuery();
            dataSource.Dispose();
        }

        internal int getCount()
        {
            Connection();
            string query = "SELECT COUNT(*) FROM contacts";
            var command = dataSource.CreateCommand(query);
            var reader =command.ExecuteScalar();
            return (int)(Int64)reader;
            
            
        }
    }
}
