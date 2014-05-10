// JavaScript Document
//拖拽运动
//使用前提：obj是绝对定位的DOM元素
//--------------------------------------------------------------------------------	 
function Dragable(obj,hiddenX,hiddenY,rangeLT,rangeRB)
{
	 if(!rangeLT)
	 {
		 rangeLT={x:0,y:0};
	 }
	 if(!rangeRB)
	 {
		 rangeRB={x:Infinity,y:Infinity};
	 }
	 obj.onmousedown = function (e) {
             this.flag = true;
             var oEvent = e || event;
			 var disX=disY=null;
			 if(!hiddenX){
                 disX = oEvent.clientX - this.offsetLeft;
			 }
			 if(!hiddenY)
			 {
				 disY=oEvent.clientY-this.offsetTop;
			 }
			 var _this=this;
			 document.onmousemove = function (e) {
                 if (_this.flag) {
					 var oEvent = e || event;
					 if(disX)
					 {
                        var lx = oEvent.clientX - disX;
						if(lx<rangeLT.x)
						 {
							lx=rangeLT.x;
						 }
						 if(lx>rangeRB.x)
						 {
							 lx=rangeRB.x;
						 }
						 _this.style['left']=lx+'px';
					 }
					 if(disY)
					 {
					     var ly=oEvent.clientY-disY;
						 if(ly<rangeLT.y)
						 {
							ly=rangeLT.y;
						 }
						 if(ly>rangeRB.y)
						 {
							 ly=rangeRB.y;
						 }
						  _this.style['top']=ly+'px';
					 }
				  }
				 return false;
			 };
			 document.onmouseup = function () {
                 document.onmousemove = null;
                 document.onmouseup=null;
             };
             return false;
         };
	
}