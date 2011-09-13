;
(function($){
	
	var autocompleters = dm_configuration.autocomplete || {};
	

	$.each(autocompleters, function(i, v){
			
			var search_input = $('#' + v.id);
			var form_input = $('#' + v.input);

			search_input
		    .autocomplete(v.url, jQuery.extend({
		      dataType: 'json',
		      parse:    function(data) {
		    	  if($.isFunction(v.config.parser)){
		    		  return v.config.parser(data, search_input);
		    	  }else{
			        var parsed = [];
			        for (var key in data) {
			          if(data.hasOwnProperty(key) && data[key].id)
			          parsed[parsed.length] = { data: [ data[key].value, data[key].id], value: data[key].value, result: data[key].value, extra: data};
			        }
			        
			        return parsed;
		    	  }
		      }
		    }, v.config))
		    .result(function(event, data) {
		    	if(v.config.result && $.isFunction(v.config.result)){
		    		v.config.result(event, data, form_input);
		    	}else{
		    		form_input.val(data[1]);
		    	}
		    });
	});
	
})(jQuery);