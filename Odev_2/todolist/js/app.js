// HTML'de yer alan item eklenecek olan listeyi DOM ile bir değişkene atama
var ul = document.querySelector("#list");

// Local Storage tanımlı değil ise Liste Elemanlarını tutmak için listArray isimli boş array tanımlama
var listArray = [];


if (localStorage.getItem("listArray")) {
  // Bu blok yani If bloğu Local Storaga içerisinde listArray daha önce tanımlandıysa oradaki listArray'i getirir ve ekrana yazdırır.

  // Local Storage içindeki güncel listeyi  listArray  içerisine alma
  listArray = JSON.parse(localStorage.getItem("listArray"));

  // Listenin ekrana yazdırılması
  for (var i = 0; i < listArray.length; i++) {
    let liNew = document.createElement("li");
    liNew.innerHTML = listArray[i]
    ul.appendChild(liNew);
  }
}
else {
  // Bu blok yani Else bloğu Local Storaga içinde listArray isimli key tanımlı değil ise çalışır ve Local Storage temizlenmediği sürece bir daha çalışmaz.

  // Sayfada default olarak gösterilmesi istenen liste elemanlarını  listArray  içerisine alma
  listArray = ["3 Litre Su İç", "Ödevleri Yap", "En Az 3 Saat Kodlama Yap", "Yemek Yap", "50 Sayfa Kitap Oku"];

  // Default olarak gelecek listeyi ekrana yazdırma
  for (var i = 0; i < listArray.length; i++) {
    let liNew = document.createElement("li");
    liNew.innerHTML = listArray[i]
    ul.appendChild(liNew);
  }

  // List Array'i Local Storage'a gönderme
  localStorage.setItem("listArray", JSON.stringify(listArray));
}


// Default liste elemanlarına silme işlemi için closeButton ekleme
let liItems = document.querySelectorAll("#list li");

for (let i = 0; i < liItems.length; i++) {
  var closeButton = document.createElement("SPAN");
  closeButton.innerHTML = "x";
  closeButton.className = "close";
  liItems[i].appendChild(closeButton);
}


// Default liste elemanlarına tamamlandı işlemi için checked isimli class'ı ekleme
let liCompleted = document.querySelectorAll("li");
for (let i = 0; i < liCompleted.length; i++) {
  liCompleted[i].onclick = function () {
    this.classList.toggle("checked");
  };
};


// Listeden bir maddenin silinmesi ve silinen maddenin Local Storage'dan da kaldırılması
var allContents = document.querySelectorAll(".close");
for (var i = 0; i < allContents.length; i++) {
  allContents[i].onclick = function () {
    this.parentElement.remove();

    var removedContent = this.parentElement.textContent;

    // İçeriğin sonunda gelen  x  karakterini silme
    removedContent = removedContent.slice(0, -1)

    var removedItemIndex = listArray.indexOf(removedContent);

    // // Array'den silinen elemanı çıkartma
    listArray.splice(removedItemIndex, 1);

    // Ve Listenin yeni halini Local Storage içine gönderme
    localStorage.setItem('listArray', JSON.stringify(listArray));
  }
}


// Toast Mesajlarının   x   simgesi tıklanarak kapatılması
let closeToast = document.querySelectorAll(".closeToast");
for (var i = 0; i < closeToast.length; i++) {
  closeToast[i].addEventListener("click", function () {
    let closeToastBox = document.querySelectorAll(".mr-1")
    setTimeout(function () {
      $(closeToastBox[i]).addClass('hidden');
    }, 0);
    setTimeout(function () {
      $(closeToastBox[i]).removeClass('hidden');
    }, 400);
  })
};


// Listeye yeni Liste Elemanı ekleme fonksiyonu
function addNewItem() {
  // Yeni list item içeriğini bir değişkene atama 
  let liContent = document.querySelector("#task").value;

  // Yeni içeriği yeni list item içine gönderme
  if (liContent == "" || liContent.replace(/^\s+|\s+$/g, "").length === 0) {
    $('.error').toast('show');          //Uyarı eklendi
  } else {
    $('.success').toast('show');        //Uyarı eklendi

    // Yeni bir li Tag oluşturma ve içerikle beraber ul içerisine ekleme
    let liNew = document.createElement("li");
    liNew.innerHTML = liContent
    ul.appendChild(liNew);

    // Yeni eklenen liste elamanına silme işini yapacak olan  closeButton  ekleme
    var closeButton = document.createElement("SPAN");
    closeButton.innerHTML = "x";
    closeButton.className = "close";
    liNew.appendChild(closeButton);

    // Kullanıcının sonradan eklediği Liste içeriğini de list Array'e ekleme
    listArray.push(liContent);

    // Yeni item eklendikten sonra array'i local storage içine yazma
    localStorage.setItem("listArray", JSON.stringify(listArray));

    // Yeni eklenen liste elemanının tamamlandı olarak işaretlenmesi
    liNew.onclick = function () {
      this.classList.toggle("checked");
    };

    // Yeni eklenen liste elemanının X tıklanarak silinmesi
    closeButton.onclick = function () {
      this.parentElement.remove();
      var removedContent = this.parentElement.textContent;
      removedContent = removedContent.slice(0, -1)
      var removedItemIndex = listArray.indexOf(removedContent);
      listArray.splice(removedItemIndex, 1);
      localStorage.setItem('listArray', JSON.stringify(listArray));
    }
  };
  // input içine yazılan metnin Ekle butonu tıklanınca temizlenmesi
  document.getElementById("task").value = "";
};