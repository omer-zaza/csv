function bul(numara) {
    const sheetId = "1nHEXQgl52p_Px22QhAEWIU2D2ZPPUUbxV-0NsmwzQRQ";
    const sheetName = encodeURIComponent("Sayfa1");
    const gq = encodeURIComponent(`SELECT B,C WHERE A = '${numara}'`);
    
    // has_header:false parametresini tqx içerisine ekledik
    const sheetURL = `https://google.com{sheetId}/gviz/tq?tqx=out:csv;has_header:false&sheet=${sheetName}&tq=${gq}`;
    
    fetch(sheetURL)
        .then((response) => response.text())
        .then((csvText) => handleResponse(csvText, numara))
        .catch((hata) => alert(hata));
}

function handleResponse(csvText, numara) {
    const el = document.querySelector("#sonuc");
    
    // Gelen ham metni temizle ve satırlara böl
    const dizi = csvText.trim().replace(/"/g, "").split("\n").filter(row => row.trim().length > 0);
    
    // Eğer kayıt bulunamadıysa veya dizi boşsa
    if (dizi.length === 0) {
        el.innerHTML += `${numara} numaralı kayıt bulunamadı<br>`;
        return;
    }
    
    // Kayıtları ekrana yazdır
    dizi.forEach(element => {
        const veri = element.split(",").join(" - "); 
        el.innerHTML += `${numara} numaralı kayıt: ${veri}<br>`;
    });
}
