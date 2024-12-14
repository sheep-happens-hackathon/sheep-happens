using MediatR;
using Microsoft.AspNetCore.Mvc;
using SheepHappens.Api.UseCases.Users.Queries.GetUserId;

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
    }
}
