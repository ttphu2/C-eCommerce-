using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    //Enum là từ khoá dùng để khai báo một kiểu liệt kê (Enumeration).
    // Kiểu liệt kê là một tập hợp các hằng số do người dùng tự định nghĩa.
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Received")]
        PaymentRecevied,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed

    }
}