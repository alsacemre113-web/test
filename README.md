# Dog Auto Theft VI – Vercel sitesi + /admin paneli

- `/` herkese açık site
- `/admin` şifreli yönetim paneli (canlı önizleme + "Kaydet ve yayınla")

Ayarlar Upstash Redis'te saklanır. Redis boşsa site `config.default.json` içindeki ilk ayarlarla açılır.

## Kurulum (bir kerelik)

1. **Projeyi Vercel'e yükle**
   - Klasörü GitHub'a yükle, vercel.com > Add New > Project > repoyu seç > Deploy.
   - Alternatif: bilgisayarda `npm i -g vercel` yazıp bu klasörde `vercel` komutunu çalıştır.

2. **Veritabanı ekle**
   - Vercel'de projeyi aç > **Storage** > **Upstash Redis** (ücretsiz plan yeterli) > oluştur > bu projeye bağla.
   - Bağlayınca `KV_REST_API_URL` ve `KV_REST_API_TOKEN` otomatik eklenir.

3. **Şifreyi belirle**
   - Proje > **Settings > Environment Variables** bölümüne iki değişken ekle:
     - `ADMIN_PASSWORD` : panele girerken yazacağın şifre (en az 12 karakter, tahmin edilmesi zor olsun)
     - `SESSION_SECRET` : uzun rastgele bir metin (en az 32 karakter)

4. **Yeniden deploy et**
   - Deployments > son deploy'un yanındaki üç nokta > **Redeploy**. (Değişkenler ancak yeni deploy'da geçerli olur.)

5. `siteadresin.com/admin` adresine git, şifreyle giriş yap.

## Kullanım

- Soldaki formda değişiklik yap, sağda canlı önizlemeyi gör.
- **Kaydet ve yayınla** deyince site herkes için birkaç saniye içinde güncellenir.
- Oturum 8 saat sürer.

## Logoyu değiştirme

Yeni görseli `images/` klasörüne koy (örn. `images/logo2.png`), projeyi yeniden deploy et, panelde Logo adresini `/images/logo2.png` yap. İnternetteki bir `https://...` görsel adresi de yazabilirsin.

## Güvenlik notları

- Şifre sadece sunucuda (Vercel ortam değişkeninde) durur, sayfa kodunda yoktur.
- Yanlış şifrede 0,8 sn bekletme vardır. Ek koruma için Vercel > Firewall'dan `/api/auth` adresine hız sınırı (rate limit) ekleyebilirsin.
- `.env` dosyalarını ve şifreyi asla GitHub'a yükleme.
