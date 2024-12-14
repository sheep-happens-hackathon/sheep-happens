using MediatR;
using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Common.Interfaces;
using SheepHappens.Api.UseCases.Users.Queries.GetUserTreesByUserId.Dtos;

namespace SheepHappens.Api.UseCases.Users.Queries.GetUserTreesByUserId
{
    public static class GetUserTreesByUserIdUseCase
    {
        public record Query(int Id) : IRequest<List<TreeDto>>;
        internal class Handler : IRequestHandler<Query, List<TreeDto>>
        {
            private readonly IRepository repository;

            public Handler(IRepository repository)
            {
                this.repository = repository;
            }
            public async Task<List<TreeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var trees = await repository.Trees.Where(x => x.UserId == request.Id).ToListAsync(cancellationToken);

                return trees.ConvertAll(x => new TreeDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Content = x.Content,
                });
            }
        }
    }
}
