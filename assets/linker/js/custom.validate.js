$(document).ready(function() {
	//http://jqueryvalidation.org/validate#toptions
	//console.log($('.form-signin').attr("role"));

	$('.form-signin').validate({
		rules: {
			name: {
				required:true
			},
			email: {
				required:true,
				email:true
			},
			password: {
				minlength:6,
				required:true
			},
			confirmation :{
				minlength:6,
				equalTo:"#password"
			}
		},
		success : function(element)
		{
			element.text("ok").addClass('valid');
		},
		errorPlacement: function(error, element) {
			//console.dir(error,element);
			//console.log(element.attr("name"));
			element.closest(".form-group").addClass('has-error');
			element.closest(".form-group").find(".help-block").html(error.text());
		}
	});

});
