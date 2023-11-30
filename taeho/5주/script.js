var imgs = ["./image/flower.jpg", "./image/fox.jpg", "./image/lightning.jpg", "./image/moon.jpg"];

var imgEl = $('#image');
var prevBtn = $('#prev');
var nextBtn = $('#next');

var currentImg = 1;

imgEl.attr('src', imgs[currentImg]);


prevBtn.on('click', function() {
    currentImg--;
    if (currentImg < 0) currentImg = imgs.length - 1;
    try{
        imgEl.attr('src', imgs[currentImg]);
    }
    catch(e){
        console.log(e);
    }
});

nextBtn.on('click', function() {
    currentImg++;
    if (currentImg > imgs.length - 1) currentImg = 0;
    try{
        imgEl.attr('src', imgs[currentImg]);
    }
    catch(e){
        console.log(e);
    }
});
