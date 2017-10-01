var data={
	appliances:[
		{id:'001',name:'air conditioning',price:'4000¥',brand:'Haier',power:'1400w',sex:'male',height:'88',weight:'550T'},
		{id:'002',name:'TV',price:'2000¥',brand:'Samsung',power:'2400w',sex:'female',height:'88',weight:'515T'},
		{id:'003',name:'water heater',price:'2000¥',brand:'Midea',power:'3400w',sex:'male',height:'88',weight:'355T'},
		{id:'004',name:'washing machine',price:'3000¥',brand:'Midea',power:'5400w',sex:'male',height:'88',weight:'235T'},
		{id:'005',name:'electric fan',price:'1000¥',brand:'Midea',power:'400w',sex:'female',height:'88',weight:'55T'},
		{id:'006',name:'hairdryer',price:'2000¥',brand:'Midea',power:'400w',sex:'male',height:'88',weight:'55T'},
		{id:'007',name:'hairdryer',price:'2000¥',brand:'Midea',power:'400w',sex:'male',height:'88',weight:'55T'},
		{id:'008',name:'hairdryer',price:'2000¥',brand:'Midea',power:'400w',sex:'male',height:'88',weight:'55T'},
		{id:'009',name:'hairdryer',price:'2000¥',brand:'Midea',power:'400w',sex:'male',height:'88',weight:'55T'},
		{id:'010',name:'hairdryer',price:'2000¥',brand:'Midea',power:'400w',sex:'male',height:'88',weight:'55T'},
		{id:'011',name:'hairdryer',price:'2000¥',brand:'Midea',power:'400w',sex:'male',height:'88',weight:'55T'}
	]
	// clothes:[
	// 	{id:'001',name:'上衣',price:'400¥',brand:'HJG',power:'1400w',sex:'male',height:'88',weight:'550T'},
	// 	{id:'002',name:'裤子',price:'200¥',brand:'II',power:'2400w',sex:'female',height:'88',weight:'515T'},
	// 	{id:'003',name:'内裤',price:'203¥',brand:'KJH',power:'3400w',sex:'male',height:'88',weight:'355T'},
	// 	{id:'004',name:'衬衫',price:'300¥',brand:'NV',power:'5400w',sex:'male',height:'88',weight:'235T'},
	// 	{id:'005',name:'手套',price:'100¥',brand:'WTR',power:'400w',sex:'female',height:'88',weight:'55T'},
	// 	{id:'006',name:'袜子',price:'200¥',brand:'LJHKJB',power:'400w',sex:'male',height:'88',weight:'55T'},
	// 	{id:'007',name:'帆布鞋',price:'200¥',brand:'HJVHFFI',power:'400w',sex:'male',height:'88',weight:'55T'},
	// 	{id:'008',name:'皮鞋',price:'245¥',brand:'ITHJK',power:'400w',sex:'male',height:'88',weight:'55T'},
	// 	{id:'009',name:'破洞裤',price:'2887¥',brand:'IYUJKJ',power:'400w',sex:'male',height:'88',weight:'55T'},
	// 	{id:'010',name:'没装',price:'270¥',brand:'IYTU',power:'400w',sex:'male',height:'88',weight:'55T'},
	// 	{id:'011',name:'没衣服',price:'2000¥',brand:'GHD',power:'400w',sex:'male',height:'88',weight:'55T'}
	// ]
};
function id(ID){
	return document.getElementById(ID);
}
function tag(name,father){
	father=father||document;
	return father.getElementsByTagName(name);
}
function delAppli(key){
	for(var i=0;i<data.appliances.length;i++){
		if(data.appliances[i].id==key){
			data.appliances.splice(i,1);
			return true;
		}
	}
	return false;
}
function addAppli(appliance){
	data.appliances.push(appliance);
}
function updataAppli(appliance){
	for(var i in data.appliances){
		if(appliance.id==data.appliances[i].id){
			for(var p in data.appliances[i])
				data.appliances[i][p]=appliance[p];
			return;
		}
	}
}
function childOnLoad(target){
	var msg={
		flag:'show',
		data:data.appliances
	}
	msg=JSON.stringify(msg);
	target.contentWindow.postMessage(msg,'*');
	// 向iframe发送show信息以及要show的数据
}
// function show(){
// 	id('login').style.display="block";
// }
// function hide(){
// 	id('login').style.display="none";
// }
window.onload=function(){
	var aLi=tag('li',id('ul1'));
	var aDiv=tag('div',id('con-left'));
	var aLi1=tag('li',id('ul2'));
	var aImg=tag('img',id('ul3'));
	for(var i=0;i<aLi.length;i++){
		id('child').src=aLi[0].getAttribute('data-to');
		aLi[i].onclick=function(){
			id('child').src=this.getAttribute('data-to');
		};
	}
	for(var i=0;i<aLi1.length;i++){
		aLi1[i].index=i;
		aLi1[i].onmouseover=function(){
			aDiv[this.index].style.display='inline-block';
		};
		aLi1[i].onmouseout=function(){
			aDiv[this.index].style.display='none';
		};
	}
	for(i=0;i<aImg.length;i++){
		aImg[i].onmouseover=function(){
			this.src=this.src.replace(/([^\/]+)\.([^\.]+)/,'$1_big.$2');
		};
		aImg[i].onmouseout=function(){
			this.src=this.src.replace(/([^\/]+)_big\.([^\.]+)/,'$1.$2');
		};
	}
	// var span=tag('span',id('logo'))[0];
	// var aA=tag('a',span);
	// for(i=0;i<aA.length;i++){
	// 	aA[i].onclick=function(){
	// 		id('child').src=this.getAttribute('data-to');
	// 	};
	// }
};
window.onmessage=function(e){
	var msg=JSON.parse(e.data);
	var sendMsg=null;
	var iframeWindow=id('child').contentWindow;
	switch(msg.flag){
		case 'del':
			var result=delAppli(msg.data);
			// if(result){
			// 	sendMsg={flag:'delCompelete'};
			// 	sendMsg=JSON.stringify(sendMsg);
			// 	iframeWindow.postMessage(sendMsg,'*');
			// }
			break;
		case 'add':
			addAppli(msg.data);
			break;
		case 'updata':
			updataAppli(msg.data);
			break;
		default:break;
	}
};