using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WarehouseController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public WarehouseController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<WarehouseToReturnDto>>> GetWarehouse(
             [FromQuery] WarehouseSpecParams wareHouseParams
        )
        {
            //From Query để có thể match request với các giá trị trong object productParams
            var spec = new WarehouseWithPaginationSpecification(wareHouseParams);
            var countSpec = new WarehouseForCountSpecification(wareHouseParams);
            var totalItem = await _unitOfWork.Repository<ProductSize>().CountAsync(countSpec);
            var products = await _unitOfWork.Repository<ProductSize>().ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<ProductSize>, IReadOnlyList<WarehouseToReturnDto>>(products);

            return Ok(new Pagination<WarehouseToReturnDto>(wareHouseParams.PageIndex, wareHouseParams.PageSize, totalItem, data));

        }

        // [Cached(600)]
        [HttpGet("{id}")]
        //config cho type tra ve cho Swagger
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WarehouseToReturnDto>> GetWarehouseById(int id)
        {
            var spec = new WarehouseWithPaginationSpecification(id);
            var product = await _unitOfWork.Repository<ProductSize>().GetEntityWithSpec(spec);
            if (product == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<ProductSize, WarehouseToReturnDto>(product);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> CreateOrUpdateProductSize(ProductSizeToCreateDto productSizeToCreate)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(productSizeToCreate.ProductId);
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
            if (productSizeToCreate != null)
            {

                product.AddOrUpdateProductSize(productSizeToCreate.Size, productSizeToCreate.Quantity);

                _unitOfWork.Repository<Product>().Update(product);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating product"));
            }
            var productSize = product.ProductSizes.FirstOrDefault(x => x.Size == productSizeToCreate.Size);

            return Ok(_mapper.Map<ProductSize, WarehouseToReturnDto>(productSize));
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<WarehouseReceiptToReturnDto>> CreateWarehouseReceipt(WarehouseReceiptDto warehouseReceiptDto)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(warehouseReceiptDto.ProductId);
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            product.AddOrUpdateProductSize(warehouseReceiptDto.Size, warehouseReceiptDto.Quantity);

            _unitOfWork.Repository<Product>().Update(product);
            var user = await _userManager.FindByEmailFromClaimsPriciple(HttpContext.User);
            var receipt = _mapper.Map<WarehouseReceiptDto, WarehouseReceipt>(warehouseReceiptDto);
            receipt.AppUserId = user.Id;
            receipt.CreatedDate = DateTime.UtcNow;
            
            _unitOfWork.Repository<WarehouseReceipt>().Add(receipt);
            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating receipt"));



            return Ok(_mapper.Map<WarehouseReceipt, WarehouseReceiptToReturnDto>(receipt));
        }
    }
}