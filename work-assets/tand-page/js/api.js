ymaps.ready(init);
function init(){  
    var myMap;
    myMap = new ymaps.Map("map", {
        center: [55.77, 49.17],
        zoom: 15.46,
        controls: ['zoomControl']
    });
    myGeoObject = new ymaps.GeoObject({
    });
    myMap.geoObjects
    .add(myGeoObject)
    .add(new ymaps.Placemark([55.770325, 49.175602], {
    	balloonContentHeader: "Продажа ТАНДЫРОВ",
    	balloonContentBody:"г. Казань, Гвардейская, 54.",
    	balloonContentFooter:"Официальный сайт: <a href='xn----7sbbfn7cwam6c9a.xn--p1ai/lp4/'>http://ваш-тандыр.рф/lp4/</a>",
    	hintContent: "Тандыры <br> г. Казань, Гвардейская, 54."
    }, {
    	preset: "islands#dotIcon",
    	iconColor: "#ED4543"
    }));        

}




