using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace RastgeleSayiUretici.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RandomNumberController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;
    private static readonly Random _random = new Random();

    public RandomNumberController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpPost("generate")]
    public IActionResult GenerateNumbers([FromBody] GenerateRequest request)
    {
        try
        {
            if (request.MinValue >= request.MaxValue)
            {
                return BadRequest(new { error = "Minimum değer maksimum değerden küçük olmalıdır!" });
            }

            if (request.Count <= 0 || request.Count > 1000)
            {
                return BadRequest(new { error = "Sayı adedi 1 ile 1000 arasında olmalıdır!" });
            }

            // Rastgele sayıları üret
            var numbers = new List<int>();
            for (int i = 0; i < request.Count; i++)
            {
                numbers.Add(_random.Next(request.MinValue, request.MaxValue + 1));
            }

            // Dosyaya kaydet
            var fileName = $"rastgele_sayilar_{DateTime.Now:yyyyMMdd_HHmmss}.txt";
            var filePath = Path.Combine(_environment.ContentRootPath, "SavedNumbers", fileName);
            
            // Klasör yoksa oluştur
            var directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory!);
            }

            // Dosyaya yaz
            var content = new StringBuilder();
            content.AppendLine($"Üretim Tarihi: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
            content.AppendLine($"Aralık: {request.MinValue} - {request.MaxValue}");
            content.AppendLine($"Üretilen Sayı Adedi: {request.Count}");
            content.AppendLine();
            content.AppendLine("Üretilen Sayılar:");
            content.AppendLine(string.Join(", ", numbers));
            content.AppendLine();
            content.AppendLine("Sayılar (Her satırda bir sayı):");
            foreach (var number in numbers)
            {
                content.AppendLine(number.ToString());
            }

            System.IO.File.WriteAllText(filePath, content.ToString(), Encoding.UTF8);

            return Ok(new
            {
                numbers = numbers,
                filePath = filePath,
                fileName = fileName
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Hata oluştu: {ex.Message}" });
        }
    }
}

public class GenerateRequest
{
    public int MinValue { get; set; }
    public int MaxValue { get; set; }
    public int Count { get; set; }
}


