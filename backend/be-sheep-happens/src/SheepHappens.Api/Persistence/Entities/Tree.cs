using System.ComponentModel.DataAnnotations.Schema;

namespace SheepHappens.Api.Persistence.Entities
{
    [Table("trees", Schema = "public")]
    public class Tree
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("title")]
        public string Title { get; set; } = string.Empty;
        [Column("content")]
        public string Content { get; set; } = string.Empty;
        [Column("user_id")]
        public int UserId { get; set; }

        public User? User { get; set; }
        public List<Node>? Nodes { get; set; }
    }
}
