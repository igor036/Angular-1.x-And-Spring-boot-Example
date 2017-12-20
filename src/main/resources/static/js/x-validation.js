//<![CDATA[
var pass = true;
var xVal = {
	email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	onlyString: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
	onlyNumber: /^[0-9]{1,}$/,
	notEmpty: /^(?=\s*\S).*$/,
	date: /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/,
	cpf: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
	cep: /[0-9]{5}-[0-9]{3}/,
}

function validarComponente(component,growl){
	
	let msg = "";
	let spanEmpty = $("span").filter("[for=" + component.id + "-empty" + "]");
	let span = $("span").filter("[for=" + component.id +"]");
	spanEmpty.hide();
	span.hide();
	
	if (component.tagName == "SELECT" && component.options[component.selectedIndex].disabled 
			/*angular js validation*/|| component.value == "? undefined:undefined ?") {
		
		span.show();
		msg = span.attr("value");
		pass = false;
		
	} else if ((component.className.indexOf("notEmpty") != -1 && !xVal['notEmpty'].test(component.value))){
		
		spanEmpty.show();
		msg = spanEmpty.attr("value");
		pass = false;
		
	} else {
		
		if (spanEmpty != undefined)
			spanEmpty.hide();
		span.hide();
		if (component.className.indexOf("notEmpty") != -1 && xVal['notEmpty'].test(component.value)) {
			let validation = component.className.split(" ")[0].split("-")[2];
			if (xVal[validation] != undefined && !xVal[validation].test(component.value)) {
				span.show();
				pass = false;
				msg = span.attr("value");
				
			} else {
				span.hide();
			}
		}
	}

	if (growl && msg != "")
		$.jGrowl(msg);
	return pass;
}

$(document).ready(function () {
	load();
});


function load(){
	//mascaras!
	
	$("input[id*='telefone']").mask("(00) 0000-0000");
	$("input[id*='celular']").mask("(00) 00000-0000");
	$("input[id*='data']").mask("00/00/0000");
	$("input[id*='cpf']").mask("000.000.000-00");
	$("input[id*='cep']").mask("00000-000");

	$("span")
		.filter("[name=xpan]")
		.css("color", "red")
		.hide();

	$.map($("input").filter("[class*=xval]"), function (component) {
		component.oninput = function(){
			validarComponente(component,false);
		}
	});
		
	$.map($("select").filter("[class*=xval]"), function (component) {
		component.onclick = function(){
			$("span").filter("[for=" + component.id +"]").hide();
		}
	});
}

function validationSubmit(xgroup) {
	
	pass = true;
	$.map($("#" + xgroup + " input").filter("[class*=xval]"), function (component) {
		validarComponente(component,true);
	});
	
	$.map($("#" + xgroup + " select").filter("[class*=xval]"), function (component) {
		validarComponente(component,true);
	});

	return pass;
}
//]]>