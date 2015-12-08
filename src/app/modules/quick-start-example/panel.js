define(["dojo/_base/declare", "ruban/panel", "jquery"],
	function(declare, Panel, $){
		'use strict';

	return declare("davranetworks.quick-start-example", Panel, {

		constructor: function(){
			console.log("quick-start-example constructor running");
		},

		initView: function(context){

			console.log("quick-start-example initView");
			if(context.getConfig().title){
				$(context.getDom()).find('h1.title').html(context.getConfig().title);
			}

			if(context.getConfig().details){
					$(context.getDom()).find('p').html(context.getConfig().details);
			}
		},

		initEditor: function(context){

			console.log("quick-start-example initEditor");
			if(context.getConfig().title){
				$(context.getDom()).find('input[name=title]').val(context.getConfig().title);
			}

			$(context.getDom()).find("button").click(function(){
				var title = $(context.getDom()).find('input[name=title]').val();
				var cfg = context.getConfig();
				cfg.title = title;

				context.saveConfig(cfg);

			});
		}
	});
});
