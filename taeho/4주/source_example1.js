console.log(c);
let a = 1;
let b = 2;
var c = 3;
{   
    let a = 2;
    {
        let a = 3;
        console.log(a);
        console.log(b);
    }
    console.log(a);
    console.log(b);

}
