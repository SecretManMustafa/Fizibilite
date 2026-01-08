# Rastgele Sayı Üretici

C# ile geliştirilmiş, belirtilen aralıkta rastgele sayılar üreten ve kaydeden web uygulaması.

## Özellikler

- Web tabanlı kullanıcı arayüzü
- Minimum ve maksimum değer aralığı belirleme
- İstediğiniz kadar rastgele sayı üretme
- Üretilen sayıları otomatik olarak dosyaya kaydetme
- Kaydedilen dosyalar `SavedNumbers` klasöründe saklanır

## Gereksinimler

- .NET 8.0 SDK veya üzeri

## Kurulum ve Çalıştırma

### Visual Studio Code ile (Önerilen - Go Live)

1. Visual Studio Code'da projeyi açın
2. C# extension'ının yüklü olduğundan emin olun (gerekirse yükleyin)
3. **F5** tuşuna basın veya Debug menüsünden "Start Debugging" seçeneğini seçin
4. Tarayıcı otomatik olarak açılacak ve uygulama çalışacaktır

### Terminal ile

1. Terminal/Command Prompt'u açın ve proje klasörüne gidin
2. Aşağıdaki komutu çalıştırın:

```bash
dotnet restore
dotnet run
```

3. Tarayıcınızda `https://localhost:5001` veya `http://localhost:5000` adresine gidin

## Kullanım

1. Minimum değer girin
2. Maksimum değer girin
3. Üretilecek sayı adedini belirleyin
4. "Sayıları Üret ve Kaydet" butonuna tıklayın
5. Üretilen sayılar ekranda görüntülenecek ve otomatik olarak dosyaya kaydedilecektir

## Kaydedilen Dosyalar

Üretilen sayılar `SavedNumbers` klasöründe, tarih ve saat bilgisiyle birlikte `.txt` formatında kaydedilir.

## Teknolojiler

- ASP.NET Core 8.0
- Razor Pages
- Bootstrap 5
- C#

