using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
             //config swaggerGen (https://localhost:5001/swagger/index.html)
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DOTNET API", Version = "v1" });
            });
            return services;
        }
        public static IApplicationBuilder UseSwaggerDocumention(this IApplicationBuilder app)
        {
            //kích hoạt swagger ( phải cài thư viện Gen + Ui trước)
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            return app;
        }
    }
}