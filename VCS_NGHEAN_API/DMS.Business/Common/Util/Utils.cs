using System.Security.Cryptography;

namespace DMS.BUSINESS.Common.Util
{
    public static class Utils
    {
        public static string CryptographyMD5(string source)
        {
            using var objMD5 = MD5.Create();
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(source);
            byte[] bytHash = objMD5.ComputeHash(buffer);
            string result = "";
            foreach (byte a in bytHash)
            {
                result += int.Parse(a.ToString(), System.Globalization.NumberStyles.HexNumber).ToString();
            }
            return result;
        }
    }
}
