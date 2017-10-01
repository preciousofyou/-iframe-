function id(ID){return document.getElementById(ID);}
function tag(name,father){
	father=father||document;
	return father.getElementsByTagName(name);
}
grid.createTr=function(obj){
	var tr=document.createElement('tr'),td;
	for(var p in obj){
		td=document.createElement('td');
		if(typeof this.config.updateHandler=='function'
			&&p==this.config.key)
			td.innerHTML='<a href="#" onclick="grid.showDialog(this)">'+obj[p]+'</a>';
		else
			td.innerText=obj[p];
		tr.appendChild(td);
	}
	if(typeof this.config.delHandler=='function'){
		td=document.createElement('td');
		td.innerHTML='<a href="#" data-id="'
			+obj[this.config.key]
			+'" onclick="grid.del(this)">delete</a>';
		tr.appendChild(td);
	}
	return tr;
};
grid.createCaption=function(){
	var caption=document.createElement('caption');
	var captionHtml='';
	captionHtml+=this.config.title;
	if(typeof this.config.addHandler=='function')
		captionHtml+='<a href="#" onclick="grid.showDialog()">create</a>';		
	caption.innerHTML=captionHtml;
	return caption;
};
grid.createTHead=function(){
	var thead=document.createElement('thead');
	var theadHtml='';
	theadHtml+='<tr>';
	for(var p in this.config.data[0]){
		theadHtml+='<th>'+p+'</th>';
	}
	if(typeof this.config.delHandler=='function')
		theadHtml+='<th>operation</th>';
	theadHtml+='</tr>';
	thead.innerHTML=theadHtml;
	return thead;
};
grid.createTBody=function(){
	var tbody=document.createElement('tbody');
	var data=this.config.data;
	for(var i in data){
		tbody.appendChild(this.createTr(data[i]));
	}
	return tbody;
};
grid.createTable=function(){
	var table=document.createElement('table');
	table.appendChild(this.createCaption());
	table.appendChild(this.createTHead());
	table.appendChild(this.createTBody());
	return table;
};
grid.initTable=function(){
	id(this.config.container)
		.appendChild(this.createTable());
};
grid.initEditDialog=function(){
	var overlay=document.createElement('div');
	overlay.id='overlay';
	document.body.appendChild(overlay);
	//根据用户传来fields字段来拼content
	var fields=this.config.fields;
	var contentHtml=
	'<div id="content">\
		<div class="title">\
			<h1>修 改</h1>\
			<span onclick="grid.closeDialog()">×</span>\
		</div>\
		<ul>';
	for(var i in fields){
		contentHtml+='<li>';
		contentHtml+='<label>'+fields[i].name+'</label>';
		switch(fields[i].type){
			case 'select':
				contentHtml+='<select id="'+fields[i].name+'">';
				for(var j in fields[i].option){
					contentHtml+='<option value="'
								+fields[i].option[j].value+'">'
					contentHtml+=fields[i].option[j].text;
					contentHtml+='</option>';
				}
				contentHtml+='</select>';
				break;
			default:
				contentHtml+='<input id="'+fields[i].name+'" />';
				break;
		}
		contentHtml+='</li>';
	}
	//拼两个按钮
	contentHtml+=
			'<li>\
				<input type="button" class="btn" value="Save" data-flag="1" onclick="grid.save(this)" id="save">\
				<input type="button" class="btn" value="Cancel" onclick="grid.closeDialog()">\
			 </li>'
	contentHtml+=
		'</ul>\
	</div>';
	overlay.innerHTML=contentHtml;
};
grid.closeDialog=function(){
	id('content').className='hide';
	setTimeout(function(){
		id('overlay').style.display='none';
	},700);
};
grid.showDialog=function(target){//弹出编辑窗口
	id('overlay').style.display='block';
	id('content').className='show';
	id('save').setAttribute('data-flag',target?"0":"1");
	if(!target) this.resetDialog();
	else{
		this.curTr=target.parentNode.parentNode;
		var data=this.config.data
		for(var i in data){
			if(data[i][this.config.key]
				==target.innerText){
				this.resetDialog(data[i]);
				break;
			}
		}
	}
};
grid.resetDialog=function(obj){
	var fields=this.config.fields;
	for(var i in fields){
		id(fields[i].name).value=
			obj?obj[fields[i].name]:"";
		id(fields[i].name).disabled=
			obj&&fields[i].name==this.config.key
			?'disabled':'';
	}
};
grid.del=function(target){
	if(!confirm('真删?')) return;
	this.config.delHandler(
		target.getAttribute('data-id'));
	var tr=target.parentNode.parentNode;
	tr.parentNode.removeChild(tr);
};
grid.save=function(target){
	//搜集整理用户的输入信息,封装到obj对象
	var obj={},fields=this.config.fields;
	for(var i in fields){
		obj[fields[i].name]=id(fields[i].name).value;
	}
	if(target.getAttribute('data-flag')=="1"){	//新增
		this.config.addHandler(obj);
		tag('tbody')[0].appendChild(this.createTr(obj));
		alert('新增成功...');
	}else{										//修改
		this.config.updateHandler(obj);
		var tds=tag('td',this.curTr);
		for(var i in fields){
			if(fields[i].name!=this.config.key)
				tds[i].innerText=obj[fields[i].name];
		}
		alert('修改成功...');
	}
	this.closeDialog();
};
function grid(config){
	grid.config=config;
	grid.initTable();
	//判断是否有必要做一个编辑窗口
	if(typeof config.addHandler=='function'||
		typeof config.updateHandler=='function')
		grid.initEditDialog();
}
grid.curTr=null;