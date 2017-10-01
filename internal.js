
function id(ID){
		return document.getElementById(ID);
}
function tag(name,father){
		father=father||document;
		return father.getElementsByTagName(name);
}

var curIndex=0;
var  handler=null;
function changeImg(nextIndex){
	var imgs=tag('img',id('right_big'));
	var lis=tag('li',id('right_big'));
	imgs[curIndex].className='hide';
	imgs[nextIndex].className='show';
	lis[curIndex].className='';
	lis[nextIndex].className='active';
	curIndex=nextIndex;
}
function autoChange(){
		var imgs=tag('img',id('right_big'));//找到所有的图片
		var nextIndex=curIndex+1>=imgs.length?0:curIndex+1;//下一张图片是否大于图片长度 不是就返回下一张
		changeImg(nextIndex);//显示下一张图片	
}
function change(){
	handler=setInterval(function(){
			autoChange();
		},2000);
		id('right_big').onmouseover=function(){
			clearInterval(handler);//鼠标滑动时停止
		};
		id('right_big').onmouseout=function(){
			handler=setInterval(function(){
				autoChange();
			},2000);//鼠标滑出继续轮播
		};
		var lis=tag('li',id('right_big'));
		for(var i=0;i<lis.length;i++){
			lis[i].index=i;
			lis[i].onclick=function(){
				changeImg(this.index);
			}//选择器 onclick是动态开辟的属性
		}
}

function selectWord(){
	var uls=tag('ul',id('left'));
	var spans=tag('span',id('sub_left'));
	for(i=0;i<uls.length;i++){
		uls[i].index=i;
		uls[i].onmouseover=function(){
			for(j=0;j<uls.length;j++){
				uls[j].className='';
				spans[j].className='hider';
			}

			this.className='active';
			spans[this.index].className='shower';
		}
		uls[i].onmouseout=function(){
				spans[this.index].className='hider';
			}
	}
}
window.onload=function(){
		change();
		selectWord();
}