import * as express from "express";

let app: express.Application = express();

app.listen(3000, () => {
    console.log("server running at port 3000");
});

// learning spread operator
let obj1={id:1,name:'apple'}
console.log(obj1)
let obj2=obj1 // this creates reference to same object
obj2.name='ball'
console.log(obj1)

let obj3={...obj1,name:'cat',address:'ktm'}
console.log(obj1); // obj 1 is unaffected as ... makes a copy of it
console.log(obj3);

let arr1 =[1,2,3]
let arr2 =[4,5,6]
let arr3=[...arr1,...arr2,-1,-2]
console.log(arr3);
