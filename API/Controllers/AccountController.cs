using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager


        , ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<UserDto>> GetListUser([FromQuery] UserSpecParams userParams)
        {
            var totalItem = await _userManager.Users.CountAsync();
            var user = await _userManager.Users
            .Skip(userParams.PageSize * (userParams.PageIndex - 1))
            .Take( userParams.PageSize).ToListAsync();
            var data = _mapper.Map<IReadOnlyList<AppUser>, IReadOnlyList<UserDto>>(user);

            return Ok(new Pagination<UserDto>(userParams.PageIndex, userParams.PageSize, totalItem, data));
            // return new UserDto
            // {
            //     Email = user.Email,
            //     DisplayName = user.DisplayName,
            //     FirstName = user.FirstName,
            //     LastName = user.LastName,
            //     Birthday = user.Birthday,
            //     Gender = user.Gender,
            //     Phone = user.Phone,
            // };
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(string id)
        {

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<AppUser, UserDto>(user);
        
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await _userManager.FindByEmailFromClaimsPriciple(HttpContext.User);
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday,
                Gender = user.Gender,
                Phone = user.Phone,
                Token = await _tokenService.CreateToken(user)

            };
        }
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindByUserByClaimsPricipleEmailWithAddressAsync(HttpContext.User);
            return _mapper.Map<Address, AddressDto>(user.Address);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDto>> CreateUser(UserToCreateDto userToCreate)
        {
            if (CheckEmailExistsAsync(userToCreate.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[]
                {"Email address is in use"}
                });
            }
            var user = new AppUser
            {
                DisplayName = userToCreate.DisplayName,
                FirstName = userToCreate.FirstName,
                LastName = userToCreate.LastName,
                Birthday = userToCreate.Birthday,
                Gender = userToCreate.Gender,
                Phone = userToCreate.Phone,
                Email = userToCreate.Email,
                UserName = userToCreate.Email,
            };
            var result = await _userManager.CreateAsync(user, userToCreate.Password);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            return new UserDto
            {

                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday,
                Gender = user.Gender,
                Phone = user.Phone,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email
            };
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserToUpdateDto>> UpdateUser(UserToUpdateDto userUpdate, string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.Birthday = userUpdate.Birthday;
            user.FirstName = userUpdate.FirstName;
            user.DisplayName = userUpdate.DisplayName;
            user.LastName = userUpdate.LastName;
            user.Phone = userUpdate.Phone;
            user.Gender = userUpdate.Gender;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return Ok(_mapper.Map<AppUser, UserToUpdateDto>(user));
            return BadRequest("Problem updating the user");
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);
                return Ok();

            }
            return BadRequest(new ApiResponse(400));

        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindByUserByClaimsPricipleEmailWithAddressAsync(HttpContext.User);
            user.Address = _mapper.Map<AddressDto, Address>(address);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));
            return BadRequest("Problem updating the user");
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<UserToUpdateDto>> UpdateInfoUser(UserToUpdateDto userUpdate)
        {
            var user = await _userManager.FindByEmailFromClaimsPriciple(HttpContext.User);
            user.Birthday = userUpdate.Birthday;
            user.FirstName = userUpdate.FirstName;
            user.DisplayName = userUpdate.DisplayName;
            user.LastName = userUpdate.LastName;
            user.Phone = userUpdate.Phone;
            user.Gender = userUpdate.Gender;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return Ok(_mapper.Map<AppUser, UserToUpdateDto>(user));
            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday,
                Gender = user.Gender,
                Phone = user.Phone,
                Token = await _tokenService.CreateToken(user)
            };
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[]
                {"Email address is in use"}
                });
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.DisplayName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email
            };
        }
        [Authorize]
        [HttpPut("changepassword")]

        public async Task<ActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.FindByEmailFromClaimsPriciple(HttpContext.User);
            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, changePasswordDto.Password);
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            return Ok();
        }

        // [Authorize(Roles = "Admin")]
        // [HttpPut("role/{id}")]
        // public async Task<ActionResult> AddRoleToUser(int id,ChangePasswordDto changePasswordDto)
        // {
        //     var user = await _userManager.FindByEmailFromClaimsPriciple(HttpContext.User);
        //     user.PasswordHash = _userManager.PasswordHasher.HashPassword(user,changePasswordDto.Password);

        //     var result = await _userManager.UpdateAsync(user);
        //     if (!result.Succeeded) return BadRequest(new ApiResponse(400));
        //     return Ok();
        // }


    }
}