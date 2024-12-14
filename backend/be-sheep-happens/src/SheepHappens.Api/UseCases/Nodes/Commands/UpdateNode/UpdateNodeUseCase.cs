using MediatR;
using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Common.Interfaces;

namespace SheepHappens.Api.UseCases.Nodes.Commands.UpdateNode
{
    public static class UpdateNodeUseCase
    {
        public record Command(int NodeId, string? Title, string? Content, bool? IsFinal) : IRequest;
        internal class Handler : IRequestHandler<Command>
        {
            private readonly IRepository repository;

            public Handler(IRepository repository)
            {
                this.repository = repository;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var node = await repository.Nodes.FirstAsync(x => x.Id == request.NodeId, cancellationToken);
                node.Title = request.Title ?? node.Title;
                node.Content = request.Content ?? node.Content;
                node.IsFinal = request.IsFinal ?? node.IsFinal;

                await repository.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
