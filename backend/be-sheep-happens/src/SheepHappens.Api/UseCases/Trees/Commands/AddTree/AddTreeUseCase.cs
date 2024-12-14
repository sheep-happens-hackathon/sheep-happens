using MediatR;
using SheepHappens.Api.Common.Interfaces;
using SheepHappens.Api.Persistence.Entities;

namespace SheepHappens.Api.UseCases.Trees.Commands.AddTree
{
    public static class AddTreeUseCase
    {
        public record Command(int UserId, string Title) : IRequest;
        internal class Handler : IRequestHandler<Command>
        {
            private readonly IRepository repository;

            public Handler(IRepository repository)
            {
                this.repository = repository;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await repository.Trees.AddAsync(new Tree
                {
                    UserId = request.UserId,
                    Title = request.Title,
                }, cancellationToken); 

                await repository.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
