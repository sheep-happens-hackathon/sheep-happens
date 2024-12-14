using MediatR;
using Microsoft.AspNetCore.Mvc;
using SheepHappens.Api.UseCases.Trees.Commands.AddTree;
using SheepHappens.Api.UseCases.Trees.Queries.GetTreeDetailsByTreeId;

namespace SheepHappens.Api.Controllers
{
    [Route("api/[controller]")]
    public class TreesController : ControllerBase
    {
        private readonly IMediator mediator;

        public TreesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTreeDetailsByTreeId(int id, CancellationToken cancellationToken)
        {
            var query = new GetTreeDetailsByTreeIdUseCase.Query(id);
            var treeDetails = await mediator.Send(query, cancellationToken);
            return Ok(treeDetails);
        }
        [HttpPost]
        public async Task<ActionResult> AddTree([FromBody] AddTreeUseCase.Command command, CancellationToken cancellationToken)
        {
            await mediator.Send(command, cancellationToken);
            return Ok();
        }
    }
}
