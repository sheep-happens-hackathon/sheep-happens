using System.ComponentModel.DataAnnotations.Schema;

namespace SheepHappens.Api.Persistence.Entities
{
    [Table("nodes", Schema = "public")]
    public class Node
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("title")]
        public string Title { get; set; } = string.Empty;
        [Column("content")]
        public string Content { get; set; } = string.Empty;
        [Column("is_final")]
        public bool IsFinal { get; set; }
        [Column("tree_id")]
        public int TreeId { get; set; }
        [Column("parent_node_id")]
        public int? ParentNodeId { get; set; }

        public Tree? Tree { get; set; }
    }
}
