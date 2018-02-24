import React, { Component } from 'react';
import store from '../store'
export default class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        Canvas.updateCanvas(1);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
        }
        else {
            var div = document.getElementById('myCanvas');
            let x;
            let y;
            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            }
            else {
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            x -= div.offsetLeft;
            y -= div.offsetTop;
            var x1 = x;
            var y1 = y;
            x=(x-500)/100;
            y=(500-y)/100;
            let xfield = document.getElementById("xval");
            let yfield = document.getElementById("yval");
            if (Math.abs(x)<=5 && Math.abs(y)<=5){
                xfield.value=x;
                yfield.value=y;
                var context = div.getContext('2d');
                var res;
                var u = -x;
                var r = Number(document.getElementById("rValue").value);
                r=Number(r);
                u=Number(u+r);
                if ((y<=u && y>=0 && y<=r && x>=0 && x<=r)||(x*x+y*y<=(r/2)*(r/2) && x<=0 && y>=0)||(x<=0 && x>=-1*r && y<=0 && y>=-1*r)) res=true;
                else res=false;
                console.log("RESULT "+res);
                context.beginPath();
                if (res==false){
                    context.fillStyle="#FF0000";
                    context.strokeStyle="#FF0000";
                    console.log("RED");
                }
                if (res==true){
                    context.fillStyle="#00FF00";
                    context.strokeStyle="#00FF00";
                    console.log("GREEN");
                }
                context.arc(x1,y1, 1, 0, 2 * Math.PI, false);
                context.fill();
                context.stroke();
                document.getElementById("pointAdd").click();
            }
        }
    }

    static updateCanvas(r) {
        let ctx = document.getElementById("myCanvas");
        var context = ctx.getContext('2d');
        context.fillStyle="#000";
        context.strokeStyle="#000";
        context.clearRect(0, 0, ctx.width, ctx.height);
        context.beginPath();
        context.moveTo(0,500);
        context.lineTo(1000,500);
        context.moveTo(500,0);
        context.lineTo(500,1000);
        context.stroke();

        context.fillStyle="#0000FF";
        context.fillRect(500-100*r,500,100*r,100*r);

        context.beginPath();
        context.moveTo(500+100*r,500);
        context.lineTo(500,500-100*r);
        context.lineTo(500,500);
        context.lineTo(500+100*r,500);
        context.fillStyle="#0000FF";
        context.fill();
        context.stroke();

        let radius = 50*r;
        let start = Math.PI;
        let end = 1.5* Math.PI;
        context.beginPath();
        context.arc(500,500,radius,start,end,false);
        context.moveTo(500-radius,500);
        context.lineTo(500,500);
        context.lineTo(500,500-radius);
        context.fillStyle="#0000FF";
        context.fill();
        context.stroke();
        var state = store.getState();
        var len = state.pointState.points.length;
        for (var i=0; i<len; i++){
            console.log(state.pointState.points[i]);
            var x = state.pointState.points[i].x;
            var y = state.pointState.points[i].y;
            var res;
            var u = -x;
            r=Number(r);
            u=Number(u+r);
            if ((y<=u && y>=0 && y<=r && x>=0 && x<=r)||(x*x+y*y<=(r/2)*(r/2) && x<=0 && y>=0)||(x<=0 && x>=-1*r && y<=0 && y>=-1*r)) res=true;
            else res=false;
            x = x*100+500;
            y = 500-y*100;
            console.log(x);
            console.log(y);
            context.beginPath();
            if (res==false){
                context.fillStyle="#FF0000";
                context.strokeStyle="#FF0000";
            }
            if (res==true){
                context.fillStyle="#00FF00";
                context.strokeStyle="#00FF00";
            }
            context.arc(x,y, 1, 0, 2 * Math.PI, false);
            context.fill();
            context.stroke();
        }
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" id="myCanvas" width={1000} height={1000}/>
            </div>
        );
    }
}