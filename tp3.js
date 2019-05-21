const homeParent = document.querySelector(".home-parent");
const principal = document.querySelector('.principal');
const navitem = document.querySelectorAll(".nav-item");
let actual = 0;


dibujar = nro => {
    fetch()
}


principal.addEventListener('click', function (e) {
    if(actual != 1){
        document.querySelector('#main-category').style.display = "none";
        homeParent.style.display = "block";
    }
    
    actual = 1;
});

navitem.forEach(function(a){
    a.addEventListener('click', function (e) {
        let numero = parseInt(a.getAttribute("numero"));
        actual = numero;

        homeParent.style.display = "none";
        document.querySelector('#main-category').style.display = "block";

    });
});