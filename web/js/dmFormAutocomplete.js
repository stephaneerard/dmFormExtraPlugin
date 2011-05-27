;
(function($){
	
	var autocompleters = dm_configuration.autocomplete || {};
	

	$.each(autocompleters, function(i, v){
		    jQuery('#' + v.id)
		    .autocomplete(v.url, jQuery.extend({}, {
		      dataType: 'json',
		      parse:    function(data) {
		        var parsed = [];
		        for (var key in data) {
		          if(data.hasOwnProperty(key) && data[key].id)
		          parsed[parsed.length] = { data: [ data[key].value, data[key].id], value: data[key].value, result: data[key].value };
		        }
		        return parsed;
		      }
		    }, v.config))
		    .result(function(event, data) { jQuery("#" + v.input).val(data[1]); });
	});
	
})(jQuery);