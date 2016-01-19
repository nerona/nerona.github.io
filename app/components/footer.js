/**
 * Author :  neron
 * time   : 2015/12/3
 * description: ...
 */
import {React} from 'react';
import {ReactDOM} from 'react-dom';
import {Stylesheet} from 'react-style';

let methodName = "showName";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }

    print() {
        console.log(this.x + this.y);
    }

    [methodName]() {
        console.log(Point.name);
    }
}

let pp = new Point(3, 6);
pp.print();
pp.showName();

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);    //
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.print();
    }
}

let cpp = new ColorPoint('red');
cpp.toString();
console.log(cpp instanceof ColorPoint);
console.log(cpp instanceof Point);

ColorPoint.__proto__ = Point;
ColorPoint.prototype.__proto__ = Point.prototype;
Object.getPrototypeOf(ColorPoint) === Point;

class myArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

var arr = new myArray();
arr[0] = 1;
console.log(arr.length);

arr.length = 0;
console.log(arr[0]);

{
    let a = 1;
    var b = 2;
}
//console.log(a + ":" + b);

{
    let x = 1;
    let y = 2;
    console.log("x=" + x + " & y=" + y);
    [x, y] = [y, x];
    console.log("x=" + x + " & y=" + y);
    function example() {
        return [1, 2, 3];
    }

    let [aa,bb,cc] = example();
    let name = "neron", time = "today";
    //let s = `Name:${name} test in ${today}`;
    //console.log(s);
}
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}
timeout(100).then((vale) => {
    console.log(value);
}).catch((err) => {
    console.log("rejected:", err);
});

function loadImageAsync(url) {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.onerror = function () {
            reject(new Error("could not load image at:" + url));
        };
        image.src = url;
    });
}

let getJson = function (url) {
    let promise = new Promise((resolve, reject) => {
        let client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });

    return promise;
};

getJson("/").then((json) => {
    console.log("Contents:" + json);
}, (error) => {
    console.error("error", error);
});

const preloadImage = function (path) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    });
};

const func = (x,y) => {
    console.log(x+y);
};

class Header extends React.component {
    constructor(props){
        super(props);
        this.state = {
            focus: false,
            hover: false
        }
    }
    render(){
        var styles = ButtonStyles.baseStyle;
        return (
            <div>
                <a href="#" styles={styles}>Hover&focus</a>
                <button className="buttonStyle">Show</button>
            </div>
        )
    }
}
var ButtonStyles = Stylesheet.create({
    baseStyle: {
        display: 'inline-block',
        width: '200px',
        height: '100px',
        border: '1px solid red',
        borderRadius: '50%',
        backgroundColor: 'green'
    },
    buttonStyle: {
        display: 'blocck',
        backgroundColor:'gray',
        color: 'red',
        width: '100px',
        height: '40px',
        borderRadius: '10px'
    }
});
module.exports = Header;