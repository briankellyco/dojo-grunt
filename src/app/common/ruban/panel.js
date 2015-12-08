/*This is the base class for all panels which are added to a RuBAN dashboard.
It defines a interface between the panel lifecycle manager and the panel
sub-class*/
define(["dojo/_base/declare"], function(declare){
	//return declare("ruban.Panel", null, {
	return declare(null, {

		constructor: function(){
			console.log("ruban.Panel constructor running");
		},

		initView: function(context){
			console.log("ruban.Panel initView running");
		}, 

		redrawView: function(){},

		initEditor: function(context){},

		destroyView: function(context){},

		destroyEditor: function(context){}
	});
});