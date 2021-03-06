using System.Linq;
using API.Errors;
using API.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddSingleton<IResponseCacheService,ResponseCacheService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            // Tiêm logger cho class ExceptionMiddleware
            services.AddSingleton<Microsoft.Extensions.Logging.ILogger>(provider =>
            provider.GetRequiredService<Microsoft.Extensions.Logging.ILogger<ExceptionMiddleware>>());
            //Transient:Một thể hiện mới luôn được tạo, mỗi khi được yêu cầu.
            //Scoped: Tạo một thể hiện mới cho tất cả các scope (Mỗi request là một scope). Trong scope thì service được dùng lại
            //Singleton: Service được tạo chỉ một lần duy nhất.
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            //config bad request trả về theo kiểu ApiValidationErrorResponse
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                 {
                     var errors = actionContext.ModelState
                     .Where(e => e.Value.Errors.Count > 0)
                     .SelectMany(x => x.Value.Errors)
                     .Select(x => x.ErrorMessage).ToArray();

                     var errorResponse = new ApiValidationErrorResponse
                     {
                         Errors = errors
                     };
                     return new BadRequestObjectResult(errorResponse);
                 };
            });
            return services;
        }
    }
}