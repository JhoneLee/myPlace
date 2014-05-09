// JavaScript Document
//**********DOM操作*****************
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

//*********Ajax********************
//创建xhr对象
function createXHR()
{
 	if(window.XMLHttpRequest)
	{
	   createXHR=function(){return new XMLHttpRequest();};
	   return new XMLHttpRequest();
	}
	else
	{
		createXHR=function(){new ActiveXObject('Microsoft.XMLHTTP');};
		return new ActiveXObject('Microsoft.XMLHTTP');
	}
}
function XHRStatusJudge(xhr,funcSucc,funcFail)
{
	if(xhr.readyState==4)
	{
	  	if(xhr.status==200)
		{
			if(funcSucc)
			{
				funcSucc(xhr.responseText);
			}
			return xhr.responseText;
		}
		else
		{
			if(funcFail)
			{
				funcFail(xhr.status);
			}
			else
			{
				alert('错误状态：'+xhr.status);
			}
		}
	}
}