import * as express from "express";

let app: express.Application = express();

app.listen(3000, () => {
    console.log("server running at port 3000");
});

// learning promise
function bookByX(): boolean {
    return false;
}

function bookByY(): boolean {
    return false;
}

function result(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (bookByX()) {
            resolve("Book is written by X");
        } else if (bookByY()) {
            resolve("Book is written by Y");
        } else {
            reject("Book not found");
        }
    });
}

// result()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

async function final() {
    try {
        const result1 = result();
        return result1;
    } catch (err) {
        return Promise.reject(err)
    }
}

final()
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e)
    });
