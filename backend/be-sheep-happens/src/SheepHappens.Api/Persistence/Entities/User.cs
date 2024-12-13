using System.ComponentModel.DataAnnotations.Schema;

namespace SheepHappens.Api.Persistence.Entities
{
    [Table("users", Schema = "public")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("login")]
        public string Login { get; set; } = string.Empty;

        public List<Tree>? Trees { get; set; }
    }
}
