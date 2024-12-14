using MediatR;
using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Common.Interfaces;
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
                var nodesInTree = await repository.Nodes.Where(x => x.TreeId == request.Id).ToListAsync(cancellationToken);
                return nodesInTree.ConvertAll(x => new NodeDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Content = x.Content,
                    IsFinal = x.IsFinal,
                    TreeId = x.TreeId,
                    ParentNodeId = x.ParentNodeId,
                });
            }
        }
    }
}
