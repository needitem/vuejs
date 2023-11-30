function outer(){
    var a = 'A';
    var b = 'B';
    function inner(){
        var a = 'AA';
        console.log(b);
    }
    b = 'BB';
    return inner;
}

var x = outer();
x();