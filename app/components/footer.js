/**
 * Author :  neron
 * time   : 2015/12/3
 * description: ...
 */
import {React} from 'react';
import {ReactDOM} from 'react-dom';

var Test = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Hello</h2>
            </div>
        );
    }
});

ReactDOM.render(
    <Test />,
    document.getElementById('test')
);
let methodName = "showName";

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return '(' + this.x + ',' + this.y + ')';
    }
    print(){
        console.log(this.x + this.y);
    }
    [methodName](){
        console.log(Point.name);
    }
}

let pp = new Point(3,6);
pp.print();
pp.showName();

class ColorPoint extends  Point {
    constructor(x,y,color){
        super(x,y);    //
        this.color = color;
    }
    toString(){
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
    constructor(...args){
        super(...args);
    }
}

var arr = new myArray();
arr[0] = 1;
console.log(arr.length);

arr.length = 0;
console.log(arr[0]);