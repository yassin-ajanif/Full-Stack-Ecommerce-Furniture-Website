using Microsoft.AspNetCore.Http;
using System.IO;

public static class FileHelper
{
    // Converts a byte array to an IFormFile
    public static IFormFile? ConvertByteArrayToIFormFile(byte[] byteArray)
    {
        // Check if the byteArray is null or empty
         if (byteArray == null || byteArray.Length == 0)
         {
             return null; // Return null if the array is null or empty
         }
        
         // Create a memory stream from the byte array
         Stream stream = new MemoryStream(byteArray);
        
         // Return a new FormFile instance
         var formFile = new FormFile(stream, 0, byteArray.Length, "file", "image.png")
         {   
             Headers = new HeaderDictionary(),
             ContentType = "image/png" ,// Adjust as needed
             
         };
        
              
         return formFile;
        
    }



    // Converts an IFormFile to a byte array
    public static byte[] ConvertIFormFileToByteArray(IFormFile formFile)
    {
        if (formFile == null) return null;

        using var memoryStream = new MemoryStream();
        formFile.CopyTo(memoryStream);
        return memoryStream.ToArray();
    }
}
