$(document).ready(function() {
	$("#cate_menu").find('li').hover(function(){
		$(this).addClass("over");
		$(this).find('ul:first').show();

	},
	function(){
		$(this).removeClass("over");
		$(this).find('ul:first').hide();
	})
	
});

function SelectStyle(on,option){
	var currentSort = $(on).attr('id');
	var currentText = $(option+" li."+currentSort+" a").html();
	$(on + " .text").html(currentText);
	$(on + " .text").hover(function(){
			$(this).addClass("hover")
	},function(){
		$(this).removeClass("hover")
	});
	$(option+" li a").each(function(index){
		$(this).click(function(){
			thishtml = $(this).html();
			$(on + " .text").removeClass("on").html(thishtml);		
			$(".selectbox select ").find("option").removeAttr('selected').eq(index).attr("selected","selected");	
			$(option).hide()
			return false;
		});
		
	});		
	
	$(".selectbox").click(function(){		
			$(option).toggle();
			$(on + " .text").toggleClass("on");		

		return false;
	});
	$(document).click(function(){
			$(option).hide();	
			$(on + " .text").removeClass("on");
	});
	$(document).trigger('click');

}