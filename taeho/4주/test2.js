let id = setInterval(() => {
    console.log('Hello World');
}, 1000);

setTimeout(() => {
    clearInterval(id);
}, 5000);
