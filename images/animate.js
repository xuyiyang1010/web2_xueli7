function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
function animate(obj,json,callback){//  对象
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){//遍历对象
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var now = parseInt(getStyle(obj,attr));
			var speed = (json[attr] - now)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var current = now + speed;
			if(attr == 'opacity'){
				obj.style.opacity = current/100;
			}else{
				obj.style[attr] = current + 'px';
			}
			//只要有一个没有到就不能清除定时器：
			if(json[attr] !== current){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	},30);
}