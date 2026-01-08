using System.Collections.Generic;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// In-memory veri deposu
var rehber = new List<Kisi>();
var idCounter = 1;

// Static dosyaları serve et
app.UseStaticFiles();

// Ana sayfa
app.MapGet("/", async (HttpContext context) =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync(Path.Combine("wwwroot", "index.html"));
});

// API Endpoints
app.MapGet("/api/kisiler", () => Results.Ok(rehber));

app.MapGet("/api/kisiler/{id}", (int id) =>
{
    var kisi = rehber.FirstOrDefault(k => k.Id == id);
    return kisi != null ? Results.Ok(kisi) : Results.NotFound();
});

app.MapPost("/api/kisiler", (Kisi kisi) =>
{
    kisi.Id = idCounter++;
    rehber.Add(kisi);
    return Results.Created($"/api/kisiler/{kisi.Id}", kisi);
});

app.MapPut("/api/kisiler/{id}", (int id, Kisi guncelKisi) =>
{
    var kisi = rehber.FirstOrDefault(k => k.Id == id);
    if (kisi == null)
        return Results.NotFound();

    kisi.Ad = guncelKisi.Ad;
    kisi.Soyad = guncelKisi.Soyad;
    kisi.Telefon = guncelKisi.Telefon;
    return Results.Ok(kisi);
});

app.MapDelete("/api/kisiler/{id}", (int id) =>
{
    var kisi = rehber.FirstOrDefault(k => k.Id == id);
    if (kisi == null)
        return Results.NotFound();

    rehber.Remove(kisi);
    return Results.NoContent();
});

app.MapGet("/api/kisiler/ara/{arama}", (string arama) =>
{
    var sonuc = rehber.Where(k =>
        k.Ad.Contains(arama, StringComparison.OrdinalIgnoreCase) ||
        k.Soyad.Contains(arama, StringComparison.OrdinalIgnoreCase) ||
        k.Telefon.Contains(arama, StringComparison.OrdinalIgnoreCase)
    ).ToList();
    return Results.Ok(sonuc);
});

app.Run();

// Model
class Kisi
{
    public int Id { get; set; }
    public string Ad { get; set; } = string.Empty;
    public string Soyad { get; set; } = string.Empty;
    public string Telefon { get; set; } = string.Empty;
}
