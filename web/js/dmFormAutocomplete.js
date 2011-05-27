;
(function($){
	
	var autocompleters = dm_configuration.autocomplete || {};
	

	$.each(autocompleters, function(i, v){
		console.log($('#' + v.id));
		
		    jQuery('#' + v.id)
		    .autocomplete(v.url, jQuery.extend({}, {
		      dataType: 'json',
		      parse:    function(data) {
		        var parsed = [];
		        for (key in data) {
		          parsed[parsed.length] = { data: [ data[key], key ], value: data[key], result: data[key] };
		        }
		        return parsed;
		      }
		    }, v.config))
		    .result(function(event, data) { jQuery("#" + v.input).val(data[1]); });
	});
	
})(jQuery);