function id(ID){
	return document.getElementById(ID);
}
function tag(name,father){
	father=father||document;
	return father.getElementsByTagName(name);
}
window.onload=function(){
	var topic=tag('img',id('topic'));
	var lis=tag('li',id('ul'));
	var p;
	for(var i=0;i<lis.length;i++){
		lis[i].onclick=function(){
			p=tag('p',this);
			for(var j=0;j<lis.length;j++){
				tag('p',lis[j])[0].className='';
			}
			p[0].className='active';
			topic[0].src=this.getAttribute('data-topic');
		};
	}
};




