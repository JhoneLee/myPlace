// 应用层
//*******************DOM操作***********************
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
				console.log('alpha(opacity='+(obj.base[item].ibase*100)+')'+'$',obj.base[item].ibase);
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
				console.log('time:'+(new Date().getTime()-head)+'$$$','路程'+obj.style[item]);
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

//******************ajax***************************
//ajax GET请求
function ajaxGET(url,dataJson,funcSucc,funcFail,cacheMinutes)
{
	var xhr=createXHR();
	xhr.onreadystatechange=function(){
		   XHRStatusJudge(xhr,funcSucc,funcFail);
		};
	 if(dataJson)
	 {
		 var reg=/\?/;
		 var arr=[];
		 for(var item in dataJson)
		 {
		   	 arr.push(item+'='+dataJson[item]);
		 }
		 if(!reg.test(url))
		 {
			 url=url+'?';
		 }
		 else
		 {
			 if(arr.length>0)
			   url+='&'; 
		 }
		 url+=arr.join('&').toString();
	 }
	 xhr.open('GET',url,true);
	 if(cacheMinutes)
	 {
		var dd=new Date();
		dd.setMinutes(dd.getMinutes()+cacheMinutes);
		xhr.setRequestHeader('Expires',dd.toGMTString()); 
	 }
	 xhr.send(null);
}
//ajax POST请求
function ajaxPOST(url,dataString,funcSucc,funcFail,contentType)
{
	var xhr=createXHR();
	xhr.onreadystatechange=function(){
		 XHRStatusJudge(xhr,funcSucc,funcFail);
		};
    xhr.open('POST',url,true);
	if(contentType)
	{
		xhr.setRequestHeader('Content-Type',contentType);
	}
	if(dataString)
	{
	  xhr.send(dataString);
	}
	else
	{
	  xhr.send(null);	
	}
}