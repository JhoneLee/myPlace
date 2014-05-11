// JavaScript Document
//**********DOM操作*****************
//返回通俗的Node类型
function getNodeType(obj)
{
	var myNodeType={
	 '1':'element对象,nodeValue=null,nodeName=标签名（大写）',
	 '2':'属性对象,nodeValue=属性值,nodeName=属性名称（大写）',
	 '3':'文本节点,nodeValue=文本,nodeName=#text',
	 '4':'XML CDATA区域,nodeValue=区域内容,nodeName=#cdata-section',
	 '5':'XML实体引用',
	 '6':'XML实体',
	 '7':'XML处理指令',
	 '8':'注释节点,nodeValue=注释的内容,nodeName=#comment',
	 '9':'document文档类型,nodeValue=null,nodeName=#document',
	 '10':'docType类型,nodeValue=null,nodeName=doctype内容',
	 '11':'文档片段,nodeValue=null,nodeName=#document-fragment',
	 '12':'XML中非 XML 数据的格式'
	};
	return myNodeType[obj.nodeType];
}
//获取元素中element节点集合
function getChildNodes(obj)
{
	var arr=[];
	var son=obj.childNodes;
	var len=son.length;
	for(var i=0;i<len;i++)
	{
		if(son[i].nodeType=='1')
		{
			arr.push(son[i]);
		}
	}
	return arr;
}
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
//返回DOM元素在页面中的绝对位置
function getPosition(obj)
{
	var pos={x:0,y:0};
	while(obj.parentNode&&obj.tagName!='HTML')
	{
		if(!obj.currentStyle&&obj.parentNode.tagName!='HTML')
		{
		  pos.x+=parseInt(getComputedStyle(obj.parentNode,null)['borderLeftWidth']);
		  pos.y+=parseInt(getComputedStyle(obj.parentNode,null)['borderTopWidth']);	
		}
		pos.x+=obj.offsetLeft;
		pos.y+=obj.offsetTop;
		obj=obj.parentNode;
	}
	return pos;
}
//************DOM事件*****************
//事件绑定对象
function addEvent(obj,type,handle)
{
   
  if(obj.addEventListener)
  {
	  obj[type+handle]=handle;
	  obj.addEventListener(type,obj[type+handle],false);
  }
  else
  {
	  obj[type+handle]=function(){handle.call(obj);};
	  obj.attachEvent('on'+type,obj[type+handle]);  
  }
}
//取消事件绑定
function removeEvent(obj,type,handle)
{
	var hand=obj[type+handle];
	if(obj.removeEventListener)
	{
      obj.removeEventListener(type,hand,false);	  	
	}
	else
	{
		obj.detachEvent('on'+type,hand);
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