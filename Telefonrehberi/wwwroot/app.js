const STORAGE_KEY = 'telefonRehberi';
let kisiler = [];
let idCounter = 1;

// Sayfa yüklendiğinde kişileri getir
document.addEventListener('DOMContentLoaded', () => {
    loadKisiler();
});

// LocalStorage'dan kişileri yükle
function loadKisiler() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            kisiler = JSON.parse(stored);
            // ID counter'ı en yüksek ID'den başlat
            if (kisiler.length > 0) {
                idCounter = Math.max(...kisiler.map(k => k.id)) + 1;
            }
        } else {
            kisiler = [];
        }
        renderKisiler(kisiler);
    } catch (error) {
        console.error('Kişiler yüklenirken hata:', error);
        kisiler = [];
        renderKisiler([]);
    }
}

// LocalStorage'a kaydet
function saveKisiler() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(kisiler));
    } catch (error) {
        console.error('Kişiler kaydedilirken hata:', error);
        alert('Veriler kaydedilirken bir hata oluştu!');
    }
}

// Kişileri listele
function renderKisiler(kisiListesi) {
    const container = document.getElementById('kisilerListesi');
    
    if (kisiListesi.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Henüz kişi yok</h3>
                <p>Yeni kişi eklemek için "Kişi Ekle" butonuna tıklayın.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = kisiListesi.map(kisi => `
        <div class="kisi-item">
            <div class="kisi-info">
                <h3>${escapeHtml(kisi.ad)} ${escapeHtml(kisi.soyad)}</h3>
                <p>📞 ${escapeHtml(kisi.telefon)}</p>
            </div>
            <div class="kisi-actions">
                <button class="btn btn-edit" onclick="editKisi(${kisi.id})">Düzenle</button>
                <button class="btn btn-danger" onclick="deleteKisi(${kisi.id})">Sil</button>
            </div>
        </div>
    `).join('');
}

// Kişi ekleme formunu göster
function showAddForm() {
    document.getElementById('formTitle').textContent = 'Kişi Ekle';
    document.getElementById('kisiForm').reset();
    document.getElementById('kisiId').value = '';
    document.getElementById('formModal').style.display = 'block';
}

// Kişi düzenleme formunu göster
function editKisi(id) {
    const kisi = kisiler.find(k => k.id === id);
    if (!kisi) return;

    document.getElementById('formTitle').textContent = 'Kişi Düzenle';
    document.getElementById('kisiId').value = kisi.id;
    document.getElementById('ad').value = kisi.ad;
    document.getElementById('soyad').value = kisi.soyad;
    document.getElementById('telefon').value = kisi.telefon;
    document.getElementById('formModal').style.display = 'block';
}

// Formu kapat
function closeForm() {
    document.getElementById('formModal').style.display = 'none';
}

// Kişi kaydet (ekle veya güncelle)
function saveKisi(event) {
    event.preventDefault();

    const id = document.getElementById('kisiId').value;
    const kisi = {
        ad: document.getElementById('ad').value.trim(),
        soyad: document.getElementById('soyad').value.trim(),
        telefon: document.getElementById('telefon').value.trim()
    };

    if (!kisi.ad || !kisi.soyad || !kisi.telefon) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    if (id) {
        // Güncelle
        const index = kisiler.findIndex(k => k.id === parseInt(id));
        if (index !== -1) {
            kisiler[index] = { ...kisiler[index], ...kisi };
            saveKisiler();
            closeForm();
            renderKisiler(kisiler);
        }
    } else {
        // Ekle
        const yeniKisi = {
            id: idCounter++,
            ...kisi
        };
        kisiler.push(yeniKisi);
        saveKisiler();
        closeForm();
        renderKisiler(kisiler);
    }
}

// Kişi sil
function deleteKisi(id) {
    if (!confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) {
        return;
    }

    kisiler = kisiler.filter(k => k.id !== id);
    saveKisiler();
    renderKisiler(kisiler);
}

// Kişi ara
let searchTimeout;
function searchKisi() {
    clearTimeout(searchTimeout);
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    searchTimeout = setTimeout(() => {
        if (searchTerm === '') {
            renderKisiler(kisiler);
            return;
        }

        const sonuc = kisiler.filter(k =>
            k.ad.toLowerCase().includes(searchTerm) ||
            k.soyad.toLowerCase().includes(searchTerm) ||
            k.telefon.includes(searchTerm)
        );
        renderKisiler(sonuc);
    }, 300);
}

// Modal dışına tıklanınca kapat
window.onclick = function(event) {
    const modal = document.getElementById('formModal');
    if (event.target === modal) {
        closeForm();
    }
}

// XSS koruması için HTML escape
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
