using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IUnitOfWork _unitOfWork;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager


        , ITokenService tokenService, IMapper mapper, RoleManager<AppRole> roleManager, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _roleManager = roleManager;
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
            var user = await _userManager.Users.Where(x => string.IsNullOrEmpty(userParams.Search) || x.Email.ToLower().Contains(userParams.Search))
            .Skip(userParams.PageSize * (userParams.PageIndex - 1))
            .Take(userParams.PageSize).ToListAsync();

            var data = _mapper.Map<IReadOnlyList<AppUser>, IReadOnlyList<UserDto>>(user);

            return Ok(new Pagination<UserDto>(userParams.PageIndex, userParams.PageSize, user.Count(), data));
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
            var token = await _tokenService.CreateToken(user);
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday,
                Gender = user.Gender,
                Phone = user.Phone,
                Token = token.Access_Token

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
            var user = await _userManager.FindByUserByClaimsPricipleEmailWithAddressAsync(User);
            // can update var email = User.FindFirstValue(ClaimTypes.Email);
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
            var token = await _tokenService.CreateToken(user);
            return new UserDto
            {

                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday,
                Gender = user.Gender,
                Phone = user.Phone,
                Token = token.Access_Token,
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

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/lock/{option}")]
        public async Task<ActionResult<UserToUpdateDto>> LockUser(string id, int option)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.LockoutEnabled = true;
            if (option == 1)
            {
                user.LockoutEnd = DateTime.Now.AddMinutes(10);
            }
            else if (option == 2)
            {
                user.LockoutEnd = DateTime.Now.AddDays(7);
            }
            else if (option == 3)
            {
                user.LockoutEnd = DateTime.Now.AddDays(30);
            }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return Ok(_mapper.Map<AppUser, UserToUpdateDto>(user));
            return BadRequest("Problem updating the user");
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/unlock")]
        public async Task<ActionResult<UserToUpdateDto>> UnlockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.LockoutEnabled = true;
            user.LockoutEnd = DateTime.Now - TimeSpan.FromMinutes(1);


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

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, true);
           if (result.IsLockedOut) return Unauthorized(new ApiResponse(403,"Your account is locked"));
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            
            var token = await _tokenService.CreateToken(user);

            if (token == null)
            {
                return Unauthorized("Invalid Attempt!");
            }
            UserRefreshTokens obj = new UserRefreshTokens
            {               
                RefreshToken = token.Refresh_Token,
                UserName = user.UserName
            };
            _unitOfWork.Repository<UserRefreshTokens>().Add(obj);
            var resultToken = await _unitOfWork.Complete();
            
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday,
                Gender = user.Gender,
                Phone = user.Phone,
                Token = token.Access_Token,
                RefreshToken = token.Refresh_Token
            };
        }
        [HttpPost("refresh")]
        public async Task<ActionResult> Refresh(Tokens token)
        {
            var principal = _tokenService.GetPrincipalFromExpiredToken(token.Access_Token);
            var username = principal.Identity?.Name;
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return Unauthorized(new ApiResponse(401));
            //retrieve the saved refresh token from database
            var spec = new TokenSavedWithUsernameAndRefreshTokenSpecification(username, token.Refresh_Token);
            var savedRefreshToken = await _unitOfWork.Repository<UserRefreshTokens>().GetEntityWithSpec(spec);

            if (savedRefreshToken == null) return Unauthorized("Not found token");
            if (savedRefreshToken.RefreshToken != token.Refresh_Token)
            {
                return Unauthorized("Invalid attempt!");
            }

            var newJwtToken = await _tokenService.GenerateRefreshToken(user);

            if (newJwtToken == null)
            {
                return Unauthorized("Invalid attempt!");
            }

            // saving refresh token to the db
            UserRefreshTokens obj = new UserRefreshTokens
            {
                RefreshToken = newJwtToken.Refresh_Token,
                UserName = username
            };

            _unitOfWork.Repository<UserRefreshTokens>().Delete(savedRefreshToken);
            _unitOfWork.Repository<UserRefreshTokens>().Add(obj);
          //  userServiceRepository.DeleteUserRefreshTokens(username, token.Refresh_Token);
          //  userServiceRepository.AddUserRefreshTokens(obj);
           // userServiceRepository.SaveCommit();
            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating token to database"));
            return Ok(newJwtToken);
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
            var token = await _tokenService.CreateToken(user);
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = token.Access_Token,
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
        [Authorize]
        [HttpGet("{id}/roles")]
        public async Task<ActionResult<IList<string>>> GetUserAndRoles(string id)
        {

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound(new ApiResponse(404));
            var userRoles = await _userManager.GetRolesAsync(user);

            var roleIds = _roleManager.Roles.Where(r => userRoles.AsEnumerable().Contains(r.Name)).ToList();
            if (userRoles == null) return NotFound(new ApiResponse(404));

            return Ok(roleIds);

        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/roles/{role}")]
        public async Task<ActionResult> AddRolesToUser(string id, string role)
        {

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound(new ApiResponse(404));

            var check = await _userManager.IsInRoleAsync(user, role);
            if (!check)
            {
                var result = await _userManager.AddToRoleAsync(user, role);
                if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            }
            return Ok(await _roleManager.FindByNameAsync(role));

        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}/roles/{role}")]
        public async Task<ActionResult> DeleteRoleToUser(string id, string role)
        {

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound(new ApiResponse(404));

            var check = await _userManager.IsInRoleAsync(user, role);
            if (check)
            {
                var result = await _userManager.RemoveFromRoleAsync(user, role);
                if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            }
            return Ok();

        }
        [Cached(600)]
        [HttpGet("roles")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetRoles()
        {
            return Ok(await _roleManager.Roles.ToListAsync());
        }


        [Authorize]
        [HttpGet("wishlist")]
        public async Task<ActionResult<IReadOnlyList<WishListDto>>> GetWishList()
        {
            var user = await _userManager.FindByUserByClaimsPricipleEmailWithAddressAsync(HttpContext.User);
            var spec = new WishWithProductSpecification(user.Id);
            var products = await _unitOfWork.Repository<WishList>().ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<WishList>, IReadOnlyList<WishListDto>>(products));
        }
        [Authorize]
        [HttpPut("wishlist/{id}")]
        public async Task<ActionResult> AddWishItem(int id)
        {
            var user = await _userManager.FindByUserByClaimsPricipleEmailWithAddressAsync(HttpContext.User);
            var spec = new WishWithProductForCheckExistSpecification(user.Id, id);
            var products = await _unitOfWork.Repository<WishList>().GetEntityWithSpec(spec);
            if (products != null) return BadRequest(new ApiResponse(400, "Wish product was existing"));
            var wish = new WishList()
            {
                AppUserId = user.Id,
                ProductId = id
            };
            _unitOfWork.Repository<WishList>().Add(wish);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating product"));

            return Ok();
        }
        [Authorize]
        [HttpDelete("wishlist/{id}")]
        public async Task<ActionResult> DeleteWishItem(int id)
        {
            var user = await _userManager.FindByUserByClaimsPricipleEmailWithAddressAsync(HttpContext.User);
            var spec = new WishWithProductForCheckExistSpecification(user.Id, id);
            var products = await _unitOfWork.Repository<WishList>().GetEntityWithSpec(spec);
            if (products == null) return BadRequest(new ApiResponse(400, "Wish product was not existing"));

            _unitOfWork.Repository<WishList>().Delete(products);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem delete wish"));

            return Ok();
        }


    }
}