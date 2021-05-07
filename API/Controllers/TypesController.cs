using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TypesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public TypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductType>> GetProductType(int id)
        {
            var brand = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);
            return Ok(brand);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductType>> CreateBrand(ProductType type)
        {
            _unitOfWork.Repository<ProductType>().Add(type);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating type"));

            return Ok(type);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductType>> UpdateBrand(int id, ProductType type)
        {
            var typeUpdate = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);
            typeUpdate.Name = type.Name;

            _unitOfWork.Repository<ProductType>().Update(typeUpdate);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating type"));

            return Ok(typeUpdate);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteType(int id)
        {
            var type = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);

            _unitOfWork.Repository<ProductType>().Delete(type);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting type"));

            return Ok();
        }

    }
}