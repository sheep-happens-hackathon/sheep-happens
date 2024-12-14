using MediatR;
using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Common.Interfaces;

namespace SheepHappens.Api.UseCases.Users.Queries.GetUserId
{
    public static class GetUserIdUseCase
    {
        public record Query(string Login) : IRequest<int>;
        internal class Handler : IRequestHandler<Query, int>
        {
            private readonly IRepository repository;

            public Handler(IRepository repository)
            {
                this.repository = repository;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await repository.Users.FirstAsync(x => x.Login == request.Login, cancellationToken);

                return user.Id;
            }
        }
    }
}
