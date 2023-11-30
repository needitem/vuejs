let i = 0;
let array = [1, 2, 3, 4, 5];
let output = "";
while (true)
{
    if(array[i] % 2 == 0)
    {   
        output = array[i];
        console.log(`output: ${output}`);
        break;
    }

    i++;
}

console.log(`output: ${output}`);