
function bul(numara) {
    const sheetId = "1nHEXQgl52p_Px22QhAEWIU2D2ZPPUUbxV-0NsmwzQRQ";
    const sheetName = encodeURIComponent("Sayfa1");
    const gq = encodeURIComponent(`SELECT B,C WHERE A = ${numara}`);
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${gq}`;
    fetch(sheetURL)
        .then((response) => response.text())
        .then((csvText) => handleResponse(csvText, numara))
        .catch((hata) => alert(hata));
}

function handleResponse(csvText, numara) {
    const el = document.querySelector("#sonuc");
    if (csvText == "") {
        el.innerHTML += `${numara} numaralı kayıt bulunamadı<br>`;
        return;
    }
    const dizi = csvText.replace(/"/g, "").split("\n");
    dizi.forEach(element => {
        el.innerHTML += `${numara} numaralı ${element}<br>`;
    });
    //el.textContent = dizi[0].split(",")[0];
}

