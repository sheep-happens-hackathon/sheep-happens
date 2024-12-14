using MediatR;
using Microsoft.AspNetCore.Mvc;
using SheepHappens.Api.UseCases.Nodes.Commands.AddNodes;
using SheepHappens.Api.UseCases.Nodes.Commands.UpdateNode;

namespace SheepHappens.Api.Controllers
{
    [Route("api/[controller]")]
    public class NodesController : ControllerBase
    {
        private readonly IMediator mediator;

        public NodesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult> AddUserNodesByUserId([FromBody] AddNodesUseCase.Command command, CancellationToken cancellationToken)
        {
            await mediator.Send(command, cancellationToken);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> UpdateNode([FromBody] UpdateNodeUseCase.Command command, CancellationToken cancellation)
        {
            await mediator.Send(command, cancellation);
            return Ok();
        }
    }
}
