// HTML'de yer alan item eklenecek olan listeyi DOM ile bir değişkene atama
var ul = document.querySelector("#list");

// Local Storage tanımlı değil ise Liste Elemanlarını tutmak için listArray isimli boş array tanımlama
var listArray = [];


// Local Storaga daha önce tanımlandıysa oradaki listArray'in güncel halini getirme
if (localStorage.getItem("listArray")) {
  // Sayfadaya index.html dosyasından gelen default liste elemanlarını silme.
  // Bu elemanlar eğer silinmediler ise Else bloğundaki Local Storage'dan getirilen array geri getirilerek listelenmekte
  while (ul.firstChild) ul.removeChild(ul.firstChild);

  // Local Storage içindeki güncel listeyi  storedArray  isimli değişkene atama
  storedArray = JSON.parse(localStorage.getItem("listArray"));

  // Sayfa refresh yapıldığında Else bloğundaki listArray içinde yer alan ancak kullanıcının sildiği list item'ın ekrana gelmemesi için
  listArray = [];

  // Sıfırlanan listArray'e Local Storage içinden getirilip storedArray ile tutulan elemanları atama
  for (var i = 0; i < storedArray.length; i++) {
    listArray[i] = storedArray[i];
  }

  // Listenin ekrana yazdırılması
  for (var i = 0; i < listArray.length; i++) {
    let liNew = document.createElement("li");
    liNew.innerHTML = listArray[i]
    ul.appendChild(liNew);
  }
}
else {
  // Bu yani Else kod bloğu Local Storaga içinde listArray isimli key tanımlı değil ise çalışır ve Local Storage temizlenmediği sürece bir daha çalışmaz.

  // index.HTML dosyasında listeye Default olarak eklenen elemanları DOM ile bir değişkene atama. Gelen liste data type'ı object olan bir NodeLİst
  // Node list uzunluk değeri değişkene atandı.
  var defaultHtmlItems = document.querySelectorAll("#list li");
  var defaultItemNumber = defaultHtmlItems.length;

  // Local Storaga tanımlı değil ise, NodeLlist olarak gelen liste elemanlarını saklanacakları  listArray  içerisine ekleme
  Array.from(defaultHtmlItems).forEach(function (e) {
    listArray.push(e.innerHTML);
  });

  // Listeyi ekrana yazdırma
  for (var i = 0; i < listArray.length; i++) {
    let liNew = document.createElement("li");
    liNew.innerHTML = listArray[i]
    ul.appendChild(liNew);
  }

  // List Array'i Local Storage'a gönderme
  localStorage.setItem("listArray", JSON.stringify(listArray));

  // index.html içerisinde Statik olarak yer alan liste elemanlarının display özelliğinin none haline getirilmesi
  // Böylece Statik liste elemanları sadece Local Storage henüz boş iken, sayfaya ilk girildiğinde listelenecektir.
  // Sayfaya ilk girildiğinde bu Statik elemanlar doğrudan Local Storage içerisine gönderiliyor.
  // Yani silinmedikleri takdirde Local Storage içinden gelecek olan Array içerisinden yine görüntülenebilirler.
  var defaultHtmlItems = document.querySelectorAll("li");
  for (var k = 0; k < defaultHtmlItems.length; k++) {
    defaultHtmlItems[k].style.display = "none";
  }

  // Local Storage içerisine gönderilen listArrary geri getirilerek ekrana yazdırılacak
  // Bunun sebebi Statik liste elemanları silindiği takdirde, tekrar html içerisinden gelemesin diye.
  // Yani sadece Local Storage içerisindeki liste elemanları ekrana yansısın.
  listArray = JSON.parse(localStorage.getItem("listArray"));
  for (var i = 0; i < listArray.length; i++) {
    let liNew = document.createElement("li");
    liNew.innerHTML = listArray[i]
    ul.appendChild(liNew);
  }
}


// Sayfa açıldığında default olarak gelen liste elemanlarına silme işlemi için closeButton ekleme
let liItems = document.querySelectorAll("#list li");

for (let i = 0; i < liItems.length; i++) {
  var closeButton = document.createElement("SPAN");
  closeButton.innerHTML = "x";
  closeButton.className = "close";
  liItems[i].appendChild(closeButton);
}


// Listeden bir maddenin silinmesi ve silinen maddenin Local Storage'dan da kaldırılması
var allContents = document.querySelectorAll(".close");
for (var i = 0; i < allContents.length; i++) {
  allContents[i].onclick = function () {
    this.parentElement.remove();

    var removedContent = this.parentElement.textContent;

    // İçeriğin sonunda gelen  X  'i silme
    removedContent = removedContent.slice(0, -1)

    var removedItemIndex = listArray.indexOf(removedContent);

    // // Array'den silinen elemanı çıkartma
    listArray.splice(removedItemIndex, 1);

    // Ve Listenin yeni halini Local Storage içine gönderme
    localStorage.setItem('listArray', JSON.stringify(listArray));
  }
}


// Listede Tamamlanan bir maddenin işaretlenmesi
let liCompleted = document.querySelectorAll("li");
for (let i = 0; i < liCompleted.length; i++) {
  liCompleted[i].onclick = function () {
    this.classList.toggle("checked");
  };
};


// Toast Mesajlarının  X  simgesi tıklanarak kapatılması
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


// Listeye yeni item ekleme fonksiyonu
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

    // Yeni eklenen liste elemanının tamamlandı olarak işaretlenmesi için
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