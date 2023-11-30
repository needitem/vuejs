var slideImage = $(".container img"),
    slideNum = $("#slide-num"),
    slideCount = slideImage.length,
    currSlide = slideCount,
    prevBtn = $("#prev"),
    nextBtn = $("#next");

prevBtn.on("click", prevSlide);
nextBtn.on("click", nextSlide);

var indBullets = $("<ul>").attr("id", "ind-ul");
for (let i = 1; i <= slideCount; i++) {
    var indItem = $("<li>")
        .attr("data-set", i)
        .text(i);
    indBullets.append(indItem);
}
$("#ind").append(indBullets);
var bulltes = $("#ind-ul li");
bulltes.on("click", function () {
    currSlide = parseInt($(this).attr("data-set"));
    check();
});
check();

function nextSlide() {
    if (nextBtn.hasClass("disabled")) {
        return false;
    } else {
        currSlide++;
        check();
    }
}
function prevSlide() {
    if (prevBtn.hasClass("disabled")) {
        return false;
    } else {
        currSlide--;
        check();
    }
}
function check() {
    slideNum.text("Slide # " + currSlide + " of " + slideCount);
    remove();
    slideImage.eq(currSlide - 1).addClass("active");
    indBullets.children().eq(currSlide - 1).addClass("active");
    if (currSlide == 1) {
        prevBtn.addClass("disabled");
    } else {
        prevBtn.removeClass("disabled");
    }
    if (currSlide == slideCount) {
        nextBtn.addClass("disabled");
    } else {
        nextBtn.removeClass("disabled");
    }
}
function remove() {
    slideImage.removeClass("active");
    bulltes.removeClass("active");
}