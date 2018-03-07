(function () {
    CanvasRenderingContext2D.prototype.triangle = function (x1,y1,x2,y2,x3,y3) {
        //alert("扩展context方法triAngle");
        //console.log(this);
        this.moveTo(x1,y1);
        this.lineTo(x2,y3);
        this.lineTo(x3,y3);
        this.closePath();
        this.stroke();
    }
})();