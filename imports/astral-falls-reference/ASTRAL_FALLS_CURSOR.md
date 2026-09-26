# Cursor aktarımı — Astral Falls

**Oyun:** Astral Falls (özgün, hızlı düşen sembollü slot demosu)  
**Kaynak:** `artifacts/astral-falls/`  
**Teknoloji:** React + Vite + TypeScript  
**Hedef branch:** `replit/astral-falls` (`match` deposunda ayrı branch)

## Sınır

Bu Replit projesi **yalnızca demo oyun arayüzüdür**. Buradaki
`src/game/engine.ts` rastgele sonucu tarayıcıda üretir; `use-slot-game.ts`
tarayıcıdaki **demo kredileri** yönetir. Bu iki davranış canlı uygulamada
asla gerçek para/coin bahsi, cüzdan veya sonuç kaynağı olmamalıdır.
Pragmatic Play'in Gates of Olympus oyununa ait görsel/ses/isimler
kullanılmamıştır; özgün tasarımı ve varlıkları koruyun.

## Taşınacaklar

- `src/App.tsx`, `src/index.css`, `src/components/`: arayüz ve animasyonlar
- `src/game/audio.ts`: orijinal, tarayıcıda üretilen ses efektleri
- `src/game/engine.ts`: **yalnızca oyun akışı ve veri biçimi için demo referansı**
- `src/game/use-slot-game.ts`: **yalnızca animasyon sıralaması için demo referansı**

Replit'e özgü Vite eklentileri, örnek API, tarayıcıdaki kredi bakiyesi ve
istemci RNG'sini ana uygulamanın üretim koduna taşımayın. Mevcut oyunları
değiştirmeyin.

## Entegrasyon sözleşmesi

1. Mevcut uygulamanın oturumu, bahis sınırları ve cüzdanı üzerinden sunucuya
   spin isteği gönderin. Sunucu bahsi tek seferde işlemesin; çift tıklama ve
   tekrar gelen istekler için işlem kimliği/idempotency kullanın.
2. Sunucu, **sonuç ve ödeme hesaplamasını kendisi yapmalı** ve gösterilecek
   6×5 başlangıç ızgarasını, her zincirde kaybolan hücreleri ve sonraki
   ızgarayı, çarpanları, bonus dönüşlerini, nihai kazancı ve güncel bakiyeyi
   tek sonuç verisinde döndürmelidir. Animasyon yalnızca bu veriyi oynatmalı.
3. `src/game/engine.ts` içindeki örnek ağırlıklar, sembol değerleri ve ödeme
   formülleri gerçek oyunun onaylanmış matematiği ya da RTP'si değildir.
   Gerçek paytable, RNG, bahis/bonus kuralları, adil oyun kanıtı ve kayıt
   düzeni ana uygulamanın yetkili sunucusunda tanımlanmalı ve denetlenmelidir.
   Kullanıcı bazlı gizli kazanma/kaybetme manipülasyonu eklemeyin.
4. Demo kredi göstergesini gerçek sunucu bakiyesiyle değiştirin; yenilemede
   sunucudan tekrar okuyun. `resetDemo` ve tarayıcı bakiyesi üretimde
   bulunmamalı. Başarısız istek için istemcide varsayımsal iade yapmayın;
   sunucudaki işlem sonucuna göre durumu gösterin.
5. Otomatik oynatma, eşzamanlı spin, geciken yanıt, ağ kopması, sayfa yenileme,
   bonus dönüşlerinin devamı ve animasyonu atlama durumlarını ele alın.
   Mobil ve reduced-motion deneyimini test edin.
6. Yayınlamadan önce ilgili bölgedeki lisans/yaş sınırı ve sorumlu oyun
   gereksinimlerini uygulamanın sahibi değerlendirmelidir.

Bu branch'i ana uygulamaya bütün hâliyle merge etmeyin; oyunu ayrı modül
olarak alın ve üretim entegrasyonunu ayrı bir incelemeden geçirin.