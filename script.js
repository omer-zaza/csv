function bul(numara) {
    const sheetId = "1nHEXQgl52p_Px22QhAEWIU2D2ZPPUUbxV-0NsmwzQRQ";
    const sheetName = encodeURIComponent("Sayfa1");
    
    // Sadece temiz bir SELECT sorgusu, 'options' kelimesi tamamen kaldırıldı
    const sqlSorgusu = `SELECT B,C WHERE A = '${numara}'`;
    const gq = encodeURIComponent(sqlSorgusu);
    
    // URL'nin sonuna benzersiz bir sayı (timestamp) ekleyerek önbelleği (cache) %100 kırıyoruz
    const benzersizZaman = new Date().getTime();
    const sheetURL = `https://google.com{sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${gq}&v=${benzersizZaman}`;
    
    fetch(sheetURL)
        .then((response) => response.text())
        .then((csvText) => handleResponse(csvText, numara))
        .catch((hata) => alert(hata));
}

function handleResponse(csvText, numara) {
    const el = document.querySelector("#sonuc");
    
    // Gelen ham metni satırlara böl
    let satirlar = csvText.trim().split("\n");
    
    // Eğer Google hata döndürdüyse veya boşsa direkt durdur
    if (!csvText || csvText.includes("google.visualization") || csvText.includes("error")) {
        el.innerHTML += `${numara} numaralı sorgu hatası veya geçersiz yanıt.<br>`;
        return;
    }
    
    // Google gviz her zaman ilk satıra sütun isimlerini (B, C) koyar. Onu listeden atıyoruz.
    if (satirlar.length > 0) {
        satirlar.shift(); 
    }
    
    // Temiz satırları filtrele (tırnak işaretlerini kaldır)
    const veriSatirlari = satirlar
        .map(satir => satir.replace(/"/g, "").trim())
        .filter(satir => satir.length > 0);
    
    // Eğer geriye veri satırı kalmadıysa kayıt bulunamamıştır
    if (veriSatirlari.length === 0) {
        el.innerHTML += `${numara} numaralı kayıt bulunamadı<br>`;
        return;
    }
    
    // Sonuçları ekrana yazdır
    veriSatirlari.forEach(eleman => {
        const duzgunMetin = eleman.split(",").join(" - ");
        el.innerHTML += `${numara} numaralı kayıt: ${duzgunMetin}<br>`;
    });
}
