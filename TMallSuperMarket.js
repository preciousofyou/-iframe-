// banner轮播图
var curIndex=0;
var handler=null;
function changeImg(nextIndex){
	var imgs=tag('img',id('banner'));
	var lis=tag('li',id('banner'));
	imgs[curIndex].className='hide';
	imgs[nextIndex].className='show';
	lis[curIndex].className='';
	lis[nextIndex].className='active';
	curIndex=nextIndex;
}
function autoChange(){
	var imgs=tag('img',id('banner'));
	var nextIndex=curIndex+1>=imgs.length?0:curIndex+1;
	changeImg(nextIndex);
}
window.onload=function(){
	handler=setInterval(autoChange,2000);
	id('banner').onmouseover=function(){
		clearInterval(handler);
	};
	id('banner').onmouseout=function(){
		handler=setInterval(autoChange,2000);
	};
	var lis=tag('li',id('banner'));
	for(var i=0;i<=lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			changeImg(this.index);
		};
	}
};