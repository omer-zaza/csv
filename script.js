function bul(numara) {
    const sheetId = "1nHEXQgl52p_Px22QhAEWIU2D2ZPPUUbxV-0NsmwzQRQ";
    const sheetName = encodeURIComponent("Sayfa1");
    // SQL sorgusuna sütun başlıklarını getirmemesi için 'options no_headers' ekledik
    const gq = encodeURIComponent(`SELECT B,C WHERE A = '${numara}' options no_headers`);
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${gq}`;
    
    fetch(sheetURL)
        .then((response) => response.text())
        .then((csvText) => handleResponse(csvText, numara))
        .catch((hata) => alert(hata));
}

function handleResponse(csvText, numara) {
    const el = document.querySelector("#sonuc");
    
    // Gelen metni temizle ve satırlara böl (boş satırları filtrele)
    const dizi = csvText.trim().replace(/"/g, "").split("\n").filter(row => row.length > 0);
    
    // Eğer dizi boşsa veya sadece boşluklardan oluşuyorsa kayıt bulunamamıştır
    if (dizi.length === 0) {
        el.innerHTML += `${numara} numaralı kayıt bulunamadı<br>`;
        return;
    }
    
    // Bulunan kayıtları ekrana yazdır
    dizi.forEach(element => {
        // CSV'deki virgülle ayrılmış B ve C sütunlarını düzgün bir metne dönüştürür
        const veri = element.split(",").join(" - "); 
        el.innerHTML += `${numara} numaralı kayıt: ${veri}<br>`;
    });
}
