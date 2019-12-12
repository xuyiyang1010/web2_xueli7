var box = document.getElementById('box');
var oNavlist = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var index = 1;
var isMoving = false;
//实现文字的轮播：
var words = document.getElementById('words');
window.onload = function(){
	var timer1 = setInterval(function(){
		var now = parseInt(getStyle(words,'left'));
		if(now == -500){
			clearInterval(timer);
			words.style.left = "900px";
		}
		else{
			words.style.left = now - 1 +"px";
		}
	},8);
}
		
//轮播下一张的函数
//右：正确
function next(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index++;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index === 6){
			slider.style.left = "-1200px";
			index = 1;
		}
		isMoving = false;
	});
}
//左：正确
function prev(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index--;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index === 0){
			slider.style.left = "-6000px";
			index = 5;
		}
		isMoving = false;
	});
}
var timer = setInterval(next,2000);
//鼠标划入清定时器
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50}); 
	clearInterval(timer);
}
//鼠标划出开定时器
box.onmouseout = function(){
	animate(left,{opacity:0})
	animate(right,{opacity:0})
	timer = setInterval(next,200);//括号
}
right.onclick = next;//括号
left.onclick = prev;//括号

//小按钮点击事件:正确
for(var i = 0;i<oNavlist.length;i++){
	oNavlist[i].idx = i;
	oNavlist[i].onclick = function(){
		index = this.idx + 1;
		navChange();
		animate(slider,{left:-1200*index});
	}
}

//小按钮样式：背景色切换
function navChange(){
	var oNavlist = document.getElementById('nav').children;
	for(var i = 0;i<oNavlist.length;i++){
		oNavlist[i].className = '';
	}
	if(index === 6){
		oNavlist[0].className = 'active';
	}else if(index === 0){
		oNavlist[4].className = 'active';
	}else{
		oNavlist[index-1].className = 'active';
	}		
}
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}