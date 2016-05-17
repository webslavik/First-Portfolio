/*
#################################################
#       Developer: Egorov Nikita
#       Подключение:
#       Элементам, которые необходимо проверить ставятся следующие атрибуты:
#		cFM_check="Как проверять", как проверять: Y - обязательно должен быть заполнен; num - проверка на число, email - на емейл; Y_num/Y_email - обязательное число\емейл
#		cFM_confirmInfo="js-селектор", - селектор того элемента, после которого выводить инфу об ошибке; по умолчанию - сам элемент
#		cFM_function="название функции" - если надо по особому проверить; должно вернуть true, если все хорошо, false, если не заполнено, 'wrong', если ошибочно заполнено, или что-нибудь еще и оно будет выведено
#		После этого в момент, когда нужна проверка, вызывается функция cFM_checktrueAttr(js-селектор родителя всех элементов, внутри которого они будут выбраны), которая возвращает T/F в зависимости от наличия ошибок заполнения формы
#################################################
*/

if(typeof cFM_classError === 'undefined')
	var cFM_classError='cFM_wrong';
var cFM_checkedGroups=',';

function cFM_checkFullness(handle)
{
	var error = true;
	var attribute = $(handle).attr('cFM_check');
	
	var required = true;
	if(attribute.indexOf('Y')===-1)
		required=false;
	var format=attribute;
	if(required)
		format=attribute.substr(2);
	switch($(handle).attr('type'))
	{
		case 'checkbox': 
			if(!$(handle).prop('checked'))
				error=false;
			break;
		case 'radio': 
			if(!$(handle).prop('checked') && $('[name="'+$(handle).attr('name')+'"]:checked').length==0)
				error=false;
			else
				error=true;
			break;
		default: 
			if(($(handle).val().trim().length==0 || $(handle).val()=='0')&&required)
				error=false;
			else
			{
				if(format==='num')
				{
					var regCheck = new RegExp('[^0-9\s-]+');
					if(regCheck.test($(handle).val()))
						error='wrong';
				}
				if(format==='email')
				{
					var regCheck = new RegExp("^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$");
					if(!regCheck.test($(handle).val()))
						error='wrong';
				}
			}
		break;
	}
	return error;
}

function cFM_prepareChecking(handle)
{
	var error=true;//возвращаемое значение; смысл - просто показать, что есть ошибка принимает значение: true - нет ошибок; false - поле не заполнено; 'wrong' - поле заполнено неправильно; 'radio' - радиокнопка отмечена и нет ошибок
	var title = " значение поля";
	if(typeof $(handle).attr('title') !== 'undefined' && $(handle).attr('title').length>0)
		title=$(handle).attr('title');
	var after = handle;
	var attribute = $(handle).attr('cFM_check');
	if(typeof $(handle).attr('cFM_function') !== 'undefined')
		var chkFunk=$(handle).attr('cFM_function');
		
	if(typeof chkFunk !== 'undefined')
		error=window[chkFunk]($(handle));
	else
		error=cFM_checkFullness(handle);
	if(error!==true)
	{
		if(typeof $(handle).attr('cFM_confirmInfo') !== 'undefined')
		{
			after=$(handle).attr('cFM_confirmInfo');
			if(after.indexOf('self')===0)//если вдруг селфы непойми зачем прилепили
				after=after.substr(4);
		}
		
		if(error==='wrong')
			$(after).after("<span class='"+cFM_classError+"'>Неверное значение поля</span>");
		else
		{
			if(error===false)
				$(after).after("<span class='"+cFM_classError+"'>"+title+"</span>");//html ошибки
			else
				$(after).after("<span class='"+cFM_classError+"'>"+error+"</span>");//если особая проверка с особой html
		}
		$(handle).addClass(cFM_classError);
		if($(handle).attr('type')=='radio')
			$('[name="'+$(handle).attr('name')+'"]').addClass(cFM_classError);
		
		error=false;
	}
	return error;
}

function cFM_checktrueAttr(parent)
{
	var error=true;
	cFM_checkedGroups=',';
	
	$('span.'+cFM_classError).remove();
	$('.'+cFM_classError).each(function(){
		$(this).removeClass(cFM_classError);
	});	
	
	var inputsToHandle=false;

	if(typeof parent !== 'undefined')
		inputsToHandle=parent.find('[cFM_check]');
	else
		inputsToHandle=$('[cFM_check]');
	inputsToHandle.each(function(){
		if(error) error=cFM_prepareChecking(this);
		else cFM_prepareChecking(this);
	}); 

	return error;
}