// JavaScript Document
$(document).ready(function () {
	///////
	var cmarr = [];
	var inarr = [];
	function getInArrays(index) {
		cmarr = [];
		inarr = [];
		$('table.table-sizes tbody tr:not(.third-head)').each(function () {
			var getval = $(this).find('td:nth-child('+index+')').text();
			if (getval != '') {
				//console.log("val: "+getval);
				var temparr = getval.split('-');
				//console.log("temparr: "+temparr);
				if (temparr.length > 1) {
					var invalue1 = 0.393701 * temparr[0];
					var invalue2 = 0.393701 * temparr[1];
					cmarr.push({ 'size1': temparr[0], 'size2': temparr[1] });
					inarr.push({ 'size1': invalue1, 'size2': invalue2 });
				} else {
					var invalue1 = 0.393701 * temparr[0];
					var invalue2 = 'none';
					cmarr.push({ 'size1': temparr[0], 'size2': 'none' });
					inarr.push({ 'size1': invalue1, 'size2': invalue2 });
				}
			}
		});
	}

	function getCmArrays(index) {
		cmarr = [];
		inarr = [];
		$('table.table-sizes tbody tr:not(.third-head)').each(function () {
			var getval = $(this).find('td:nth-child('+index+')').text();
			if (getval != '') {
				//console.log("val: "+getval);
				var temparr = getval.split('-');
				//console.log("temparr: "+temparr);
				if (temparr.length > 1) {
					var cmvalue1 = Math.round(2.54 * temparr[0]);
					var cmvalue2 = Math.round(2.54 * temparr[1]);
					inarr.push({ 'size1': temparr[0], 'size2': temparr[1] });
					cmarr.push({ 'size1': cmvalue1, 'size2': cmvalue2 });
				} else {
					var cmvalue1 = Math.round(2.54 * temparr[0]);
					var cmvalue2 = 'none';
					inarr.push({ 'size1': temparr[0], 'size2': 'none' });
					cmarr.push({ 'size1': cmvalue1, 'size2': cmvalue2 });
				}
			}
		});
	}

	//////
	//console.log( "ready!" );
	var mycss = `<style>
	#modal_taillant .header{
		position:relative;
	}
	ul.sp-in-cm{
		width:auto;
		height:auto;
		display:flex;
		position:absolute;
		top:50%;
		transform:translateY(-50%);
		right:60px;
		list-style:none;
	}
	ul.sp-in-cm li a{
		width:60px;
		height:50px;
		display:block;
		box-sizing:border-box;
		text-align:center;
		line-height:48px;
		border:#fff 1px solid;
		font-size:14px;
		color:#FFF;
		font-style:normal;
		transition:all 0.3s;
		-moz-transition:all 0.3s;
		-webkit-transition:all 0.3s;
		-o-transition:all 0.3s;
	}
	ul.sp-in-cm li:hover a,
	ul.sp-in-cm li.active a{
		background:#ff8d00;
		border-color:#ff8d00;
		text-decoration:none;
	}
	</style>`;
	$('body').prepend(mycss);
	var myhtml = '<ul class="sp-in-cm">';
	myhtml += '<li class="active"><a href="#" class="cm">CM</a></li>';
	myhtml += '<li><a href="#" class="in">IN</a></li>';
	myhtml += '</ul>';
	$('#modal_taillant .header h1').append(myhtml);
	//////
	$('ul.sp-in-cm li a').click(function (event) {
		event.preventDefault();
		//alert(1);
		if ($(this).parent().hasClass('active')) {
		} else {
			$('.sp-in-cm li').removeClass('active');
			$(this).parent().addClass('active')
			if ($(this).hasClass('in')) {
				//do something it does have the protected class!
				//console.log("i have the in class");
				inchConverter();
			} else {
				//console.log("i have the cm class");
				cmConverter();
			}
		}
	})
	function cmConverter() {
		//table-sizes
		$('table.table-sizes tbody tr.third-head td').html('<span class="">Centimeters</span>');
		///cmarr
		/*for (var i = 0; i < cmarr.length; i++) { 
			console.log("size1: "+cmarr[i].size1+", size2: "+cmarr[i].size2);
			$('table.table-sizes tbody tr:not(.third-head) td:nth-child(2)')
		}*/
		//return;
		for( let i=2; i<7; i++){
			getCmArrays(i);
		$('table.table-sizes tbody tr:not(.third-head)').each(function (index) {
			var getval = $(this).find('td:nth-child('+i+')').text();
			if (getval != '') {
				var arr = getval.split('-');
				var count = index - 1;
				console.log('CM: ' + cmarr[count].size1 + ', ' + cmarr[count].size1)
				if (cmarr[count].size2 != 'none') {
					var cmvalue1 = cmarr[count].size1;
					var cmvalue2 = cmarr[count].size2;
					$(this).find('td:nth-child('+i+')').html('<span class="">' + cmvalue1 + '-' + cmvalue2 + '</span>');
				} else {
					var cmvalue1 = cmarr[count].size1;
					$(this).find('td:nth-child('+i+')').html('<span class="">' + cmvalue1 + '</span>')
				}

			}
		});
	}

	}
	function inchConverter() {
		$('table.table-sizes tbody tr.third-head td').html('<span class="">Inches</span>');
		for( let i=2; i<7; i++){
			getInArrays(i);
		$('table.table-sizes tbody tr:not(.third-head)').each(function (index) {
			var getval = $(this).find('td:nth-child('+i+')').text();
			if (getval != '') {
				console.log('index: ' + index)
				var count = index - 1;
				if (inarr[count].size2 != 'none') {
					var cmvalue1 = inarr[count].size1.toFixed(1);
					var cmvalue2 = inarr[count].size2.toFixed(1);
					$(this).find('td:nth-child('+i+')').html('<span class="">' + cmvalue1 + '-' + cmvalue2 + '</span>');
				} else {
					var cmvalue1 = inarr[count].size1.toFixed(1);
					$(this).find('td:nth-child('+i+')').html('<span class="">' + cmvalue1 + '</span>')
				}
			}
		});
	}
		/*$('table.table-sizes tbody tr:not(.third-head)').each(function() {
  			var getval = $( this ).find('td:nth-child(2)').text();
			if(getval != ''){
				////console.log("CM: "+getval);
				var arr = getval.split('-');
				if(arr.length > 1){
					var cmvalue1 = 0.393701*arr[0];
					var cmvalue2 = 0.393701*arr[1];
					cmvalue1 = cmvalue1.toFixed(1);
					cmvalue2 = cmvalue2.toFixed(1);
					//console.log(cmvalue1+"-"+cmvalue2);
					$( this ).find('td:nth-child(2)').html('<span class="">'+cmvalue1+'-'+cmvalue2+'</span>');
				}else{
					var cmvalue1 = 0.393701*arr[0];
					cmvalue1 = cmvalue1.toFixed(1);
					$( this ).find('td:nth-child(2)').html('<span class="">'+cmvalue1+'</span>')
				}
			}
		});*/
	}
	/////
});