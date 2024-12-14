namespace SheepHappens.Api.UseCases.Nodes.Commands.AddNodes.Dtos
{
    public class NodeDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public bool IsFinal { get; set; }
        public int TreeId { get; set; }
        public int? ParentNodeId { get; set; }
    }
}
