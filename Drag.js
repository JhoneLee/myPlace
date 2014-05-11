// JavaScript Document
//拖动对象
//当前版本问题：存在鼠标右键点击亦可拖动，此问题下一版本解决
function createDrag(obj,hiddenX,hiddenY,rangeLT,rangeRB)
{
	this.hiddenX=hiddenX;
	this.hiddenY=hiddenY;
	this.rangeLT=rangeLT?rangeLT:{x:0,y:0};
	this.rangeRB=rangeRB?rangeRB:{x:Infinity,y:Infinity};
	var flag=false;
	var _this=this;
	obj.onmousedown=function(e){
			 flag=true;
			 var oEvent=e||event;
			 var disX=_this.hiddenX?null:oEvent.clientX-this.offsetLeft;
			 var disY=_this.hiddenY?null:oEvent.clientY-this.offsetTop;
			 document.onmousemove=function(e){
			  if(flag)
			  { 
			   var oEvent=e||event;
			   if(disX!==null)
			   {
				   var lx=oEvent.clientX-disX;
				   lx=(lx>_this.rangeLT.x)?lx:_this.rangeLT.x;
				   lx=(lx<_this.rangeRB.x)?lx:_this.rangeRB.x;
				   obj.style['left']=lx+'px';
			   }
			   if(disY!==null)
			   {
				   var ly=oEvent.clientY-disY;
				   ly=(ly>_this.rangeLT.y)?ly:_this.rangeLT.y;
				   ly=(ly<_this.rangeRB.y)?ly:_this.rangeRB.y;
				   obj.style['top']=ly+'px';
			   }
			  }
			 };
			 document.onmouseup=function(){
				   document.onmousemove=null;
				   document.onmouseup=null;
				 };
			 return false;
	};
	
}
	  	

//拖动函数
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
					 if(disX!=null)
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
					 if(disY!=null)
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