using System.Text;

namespace DMS.API.AppCode.Extensions
{
    public static class HttpRequestExtensions
    {
        public static async Task<string> ReadBodyFromRequest(this HttpRequest request, Encoding encoding = null)
        {
            try
            {
                request.Body.Position = 0;
                using var reader = new StreamReader(request.Body, encoding ?? Encoding.UTF8);
                var body = await reader.ReadToEndAsync().ConfigureAwait(false);
                request.Body.Position = 0;
                return body;
            }
            catch (Exception ex)
            {
                return "Exception: Không đọc được thông tin body từ Request: " + ex.ToString();
            }
            
        }
    }
}
