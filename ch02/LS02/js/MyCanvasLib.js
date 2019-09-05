//LS02_08
(function () {
    CanvasRenderingContext2D.prototype.triangle = function (x1,y1,x2,y2,x3,y3) {
        this.moveTo(x1,y1);
        this.lineTo(x2,y2);
        this.lineTo(x3,y3);
        this.closePath();
        this.stroke();
    };
    CanvasRenderingContext2D.prototype.polygon = function (x,y,r,n) {
	//补全代码实现多边形的绘制
	//其中x为中心点x坐标，y为中心点y坐标，r为半径，n为多边形边的数量
	
    };
    CanvasRenderingContext2D.prototype.star = function (x,y,r,R) {
	//补全代码实现五角星的绘制,要求填充颜色为黄色，外描边为红色
	//其中x为中心点x坐标，y为中心点y坐标，r为五角星内径，R为五角星外径
	
    };
})();