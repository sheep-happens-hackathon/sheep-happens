using MediatR;
using SheepHappens.Api.Common.Interfaces;
using SheepHappens.Api.Persistence.Entities;
using SheepHappens.Api.UseCases.Nodes.Commands.AddNodes.Dtos;

namespace SheepHappens.Api.UseCases.Nodes.Commands.AddNodes
{
    public static class AddNodesUseCase
    {
        public record Command(IEnumerable<NodeDto> Nodes) : IRequest;
        internal class Handler : IRequestHandler<Command>
        {
            private readonly IRepository repository;

            public Handler(IRepository repository)
            {
                this.repository = repository;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                foreach(var node in request.Nodes)
                {
                    await repository.Nodes.AddAsync(new Node 
                    {
                        Title = node.Title,
                        Content = node.Content,
                        IsFinal = node.IsFinal,
                        TreeId = node.TreeId,
                        ParentNodeId = node.ParentNodeId
                    }, cancellationToken);
                }

                await repository.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
