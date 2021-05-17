using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderSevice;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public OrdersController(IOrderService orderSevice, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderSevice = orderSevice;
        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await _orderSevice.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);
            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));
            return Ok(order);
        }
        [HttpPost("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Order>> CreateOrderAdmin(OrderToCreateDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderSevice.CreateOrderAdminAsync(email, orderDto.DeliveryMethodId, _mapper.Map<List<OrderItemDto>,List<BasketItem>>(orderDto.OrderItems), orderDto.ShipToAddress);
            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));
            return Ok(order);
        }
        
        [HttpPut("admin/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Order>> UpdateOrderAdmin(int id,OrderToCreateDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderSevice.UpdateOrderAdminAsync(id,email, orderDto.DeliveryMethodId, _mapper.Map<List<OrderItemDto>,List<BasketItem>>(orderDto.OrderItems), orderDto.ShipToAddress);
            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));
            return Ok(order);
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var orders = await _orderSevice.GetOrdersForUserAsync(email);
            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetAllOrders( [FromQuery] OrderSpecParams orderParams)
        {
            var spec = new OrdersAllWithItemsAndOrderingSpecification(orderParams);
            var countSpec = new OrderWithFiltersForCountSpecification(orderParams);
            var totalItem = await _unitOfWork.Repository<Order>().CountAsync(countSpec);
            var orders = await _unitOfWork.Repository<Order>().ListAsync(spec);
           // var data = _mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders);
            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }
        [HttpGet("all/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderById(int id)
        {
            var spec = new OrdersAllWithItemsAndOrderingSpecification(id);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
             if (order == null) return NotFound(new ApiResponse(404));
            return Ok(_mapper.Map<Order, OrderToReturnDto>(order));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderSevice.GetOrderByIdAsync(id, email);
            if (order == null) return NotFound(new ApiResponse(404));
           return _mapper.Map<Order, OrderToReturnDto>(order);
           
        }
        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderSevice.GetDeliveryMethodsAsync());
        }


    }
}