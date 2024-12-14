using SheepHappens.Api.Persistence.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace SheepHappens.Api.UseCases.Trees.Queries.GetTreeDetailsByTreeId.Dtos
{
    public class NodeDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public bool IsFinal { get; set; }
        public int TreeId { get; set; }
        public int? ParentNodeId { get; set; }
    }
}
