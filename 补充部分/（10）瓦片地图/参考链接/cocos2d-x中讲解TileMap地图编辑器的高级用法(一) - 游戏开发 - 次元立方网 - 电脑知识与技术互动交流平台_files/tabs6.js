function Tab(ID,Num,Length,Css,CssW){
	for(var i=0;i<=Length;i++)
	{
		if(i == Num){
			document.getElementById(ID + Num).className = CssW;
			document.getElementById(ID + Num+ Num).style.display = 'block';
		}
		else{
			document.getElementById(ID  + i).className = Css;
			document.getElementById(ID + i+ i).style.display = 'none';
		}
	}
}
function TabW(ID,Num,Length,Css,CssW){
	for(var i=0;i<=Length;i++)
	{
		if(i == Num){
			document.getElementById(ID + Num).className = CssW;
			document.getElementById(ID + Num+ Num).style.display = 'block';
			document.getElementById(ID + Num+ Num+ Num).style.display = 'block';
		}
		else{
			document.getElementById(ID  + i).className = Css;
			document.getElementById(ID + i+ i).style.display = 'none';
			document.getElementById(ID + i+ i+ i).style.display = 'none';
		}
	}
}

function category_SearchHTML()
{
	var html = '';
	html +='<form class="SearchBox" action="http://s.it165.net/" method="get" target="_blank">';
	html +='	<input type="hidden" name="t" value="53" id="t"/>';
	html +='	<div class="KeysBox"><input class="KeysBox" name="q" type="text" /></div>';
	html +='	<div class="ButtonsBox"><input class="ButtonsBox" type="submit" value=" " /></div>';
	html +='</form>';
	$('#searchbox').html(html);
}
