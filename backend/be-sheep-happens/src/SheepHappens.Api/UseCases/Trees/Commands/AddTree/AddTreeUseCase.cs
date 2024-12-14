using MediatR;
using SheepHappens.Api.Common.Interfaces;
using SheepHappens.Api.Persistence.Entities;

namespace SheepHappens.Api.UseCases.Trees.Commands.AddTree
{
    public static class AddTreeUseCase
    {
        public record Command(int UserId, string Title, string Content) : IRequest<int>;
        internal class Handler : IRequestHandler<Command, int>
        {
            private readonly IRepository repository;

            public Handler(IRepository repository)
            {
                this.repository = repository;
            }
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var newTree = new Tree
                {
                    UserId = request.UserId,
                    Title = request.Title,
                    Content = request.Content,
                };
                await repository.Trees.AddAsync(newTree , cancellationToken); 

                await repository.SaveChangesAsync(cancellationToken);
                return newTree.Id;
            }
        }
    }
}
