// Kullanıcıdan ismi alındı.
let isim = prompt("Adınız nedir?");

// Kullanıcının yazdığı isim ve varsa soyisim sadece ilk harfleri büyük harf olacak şekilde düzenlendi.
let isimSplit = isim.toLowerCase().split(' ');
for (var i = 0; i < isimSplit.length; i++) {
    isimSplit[i] = isimSplit[i].charAt(0).toUpperCase() + isimSplit[i].substring(1);     
}
isim = isimSplit.join(' ');

// Düzenlenen isim bilgisi sayfaya eklendi.
document.querySelector("#myName").innerHTML = isim;

// Saat ve günü ekranda gösterme fonksiyonu
function showTime(){
    
    //Saat bilgisi
    var date = new Date();
    var h = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    // Değerler 10'dan küçük ise önüne 0 eklendi.
    h   = h < 10 ? "0" + h : h;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    // Gün bilgisi
    var currentDay = date.getDay();
    let days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
    currentDay = days[currentDay-1];
    
    // Veriler sayfaya eklendi.
    document.querySelector("#myClock").innerHTML = h + ":" + min + ":" + sec + " " + currentDay;

   setTimeout(showTime, 500);
}

showTime();