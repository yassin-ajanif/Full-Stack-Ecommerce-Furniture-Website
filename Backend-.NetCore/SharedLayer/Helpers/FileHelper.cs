using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using System.IO;

public static class FileHelper
{
    // Converts a byte array to an IFormFile
    public static IFormFile ConvertByteArrayToIFormFile(byte[] byteArray)
    {
        var stream = new MemoryStream(byteArray);
        var formFile = new FormFile(stream, 0, byteArray.Length, "file", "image")
        {
            Headers = new HeaderDictionary(),
            ContentType = "application/octet-stream"
        };

        return formFile;
    }


    // Converts an IFormFile to a byte array
    public static byte[] ConvertIFormFileToByteArray(IFormFile formFile)
    {
        using (var memoryStream = new MemoryStream())
        {
            formFile.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }
}
