using MediatR;
using Microsoft.AspNetCore.Mvc;
using SheepHappens.Api.UseCases.Users.Queries.GetUserId;
using SheepHappens.Api.UseCases.Users.Queries.GetUserTreesByUserId;

namespace SheepHappens.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator mediator;

        public UsersController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("id")]
        public async Task<ActionResult> GetUserId([FromBody] GetUserIdUseCase.Query command, CancellationToken cancellationToken)
        {
            var id = await mediator.Send(command);
            return Ok(id);
        }
        [HttpGet("{id}/trees")]
        public async Task<ActionResult> GetUserTreesByUserId(int id, CancellationToken cancellationToken)
        {
            var query = new GetUserTreesByUserIdUseCase.Query(id);
            var trees = await mediator.Send(query, cancellationToken);
            return Ok(trees);
        }
    }
}
