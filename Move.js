// JavaScript Document
//基础函数
//返回元素的样式值
function getStyle(obj,styleName)
{
	if(obj.currentStyle)
	{
		 getStyle=function(obj,styleName)
		 {
		   return obj.currentStyle[styleName];	  
		 }
		 return obj.currentStyle[styleName];
	}
	else
	{
	     getStyle=function(obj,styleName)
		 {
		   return getComputedStyle(obj,null)[styleName];	  
		 }
		 return getComputedStyle(obj,null)[styleName];
	}
}

//运动函数

//******************匀速定时运动********************
function Move(obj,moveJson,time,callback)
{
	head=new Date().getTime();
	if(time==null)
	{
		time=1000;
	}
	clearInterval(obj.timer);
	obj.base={};
	for(var item in moveJson)
	{
		if(item=='opacity')
		{
		  var target=parseFloat(moveJson[item]);
		  var begin=parseFloat(getStyle(obj,item));
		  var speed=(target-begin)/Math.round(time/30);	
		}
		else
		{
		  var target=parseInt(moveJson[item]);
		  var begin=parseInt(getStyle(obj,item));
		  var speed=(target-begin)/Math.round(time/30);
		}
		obj.base[item]={ibase:begin,ispeed:speed,itimes:Math.round(time/30)};
	}
	var flag=true;
	obj.timer=setInterval(
	function()
	{
	  	for(var item in moveJson)
		{
		  if(item=='opacity')
		  {
			  if( obj.base[item].itimes)
			  {
				obj.base[item].ibase+=obj.base[item].ispeed;
                obj.style[item]=obj.base[item].ibase;
				obj.style['filter']='alpha(opacity='+(obj.base[item].ibase*100)+')';
				
				flag=false;
				obj.base[item].itimes--;
			  }
			  else
			  {
				  flag=true;
			  }
		  }
		  else
		  {
			if(obj.base[item].itimes)
			{
				obj.base[item].ibase+=obj.base[item].ispeed;
				if(obj.base[item].itimes==1)
				{
				    obj.style[item]=Math.round(obj.base[item].ibase)+'px';
				}
				else
				{
					obj.style[item]=obj.base[item].ibase+'px';
				}
				flag=false;
				obj.base[item].itimes--;
				
			}
			else
			{
				flag=true;
			}
		  }
		  if(flag)
		  {
			 clearInterval(obj.timer);
			 if(callback)
			 {
				 callback();
				 callback=null;
			 }
		  }
		}
	},30);
}