using MediatR;
using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Common.Interfaces;
using SheepHappens.Api.Persistence.Entities;
using SheepHappens.Api.UseCases.Trees.Queries.GetTreeDetailsByTreeId.Dtos;

namespace SheepHappens.Api.UseCases.Trees.Queries.GetTreeDetailsByTreeId
{
    public static class GetTreeDetailsByTreeIdUseCase
    {
        public record Query(int Id) : IRequest<List<NodeDto>>;
        internal class Handler : IRequestHandler<Query, List<NodeDto>>
        {
            private readonly IRepository repository;

            public Handler(IRepository repository)
            {
                this.repository = repository;
            }
            public async Task<List<NodeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var nodes = await repository.Nodes.ToListAsync(cancellationToken);
                var nodesInOrder = new List<NodeDto>();

                var firstNode = nodes.First(x => x.ParentNodeId == null);
                nodesInOrder.Add(new NodeDto
                {
                    Id = firstNode.Id,
                    Title = firstNode.Title,
                    Content = firstNode.Content,
                    IsFinal = firstNode.IsFinal,
                    TreeId = firstNode.TreeId,
                    ParentNodeId = firstNode.ParentNodeId,
                });
                var parentIds = new List<int> { firstNode.Id };

                while(nodesInOrder.Count != nodes.Count)
                {
                    var sameLevelNodes = nodes.Where(x => parentIds.Contains(x.ParentNodeId ?? 0)).OrderBy(x => x.ParentNodeId).ThenBy(x => x.Id).ToList();
                    nodesInOrder.AddRange(sameLevelNodes.ConvertAll(x => new NodeDto
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Content = x.Content,
                        IsFinal = x.IsFinal,
                        TreeId = x.TreeId,
                        ParentNodeId = x.ParentNodeId,
                    }));
                    parentIds = sameLevelNodes.Select(x => x.Id).ToList();
                }

                return nodesInOrder;
            }
        }
    }
}
