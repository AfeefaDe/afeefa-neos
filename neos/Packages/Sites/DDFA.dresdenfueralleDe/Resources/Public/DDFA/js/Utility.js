qx.Class.define("Utility", {
	
	extend : Daddy,
	type: "singleton",  

	construct: function(){
		var that = this;

		// that.addEvents();
	},

	members : {

		buildTimeString: function( record ){
			var times = '';
			
			var dateFrom = record.dateFrom? convertTime(record.dateFrom) : record.dateFrom;
			var dateTo = record.dateTo? convertTime(record.dateTo) : record.dateTo;
			var timeFrom = record.timeFrom;
			var timeTo = record.timeTo;

			if( dateFrom && timeFrom && dateTo && timeTo){
				times += 'vom ' + dateFrom + ' um ' + timeFrom + '<br>';
				times += 'bis ' + dateTo + ' um ' + timeTo;
			}
			else if( dateFrom && timeFrom && timeTo){
				times += dateFrom + ' von ' + timeFrom + ' bis ' + timeTo;
			}
			else if( dateFrom && timeFrom){
				times += dateFrom + ' um ' + timeFrom;
			}
			else if( dateFrom && dateTo){
				times += 'vom ' + dateFrom + ' bis ' + dateTo;
			}
			else if( dateFrom ){
				times += dateFrom;
			}
			
			function convertTime( timeValue ){
				var dateObj = new Date(timeValue);
				var formattedString = '';
				if( APP.getLM().getCurrentLang() == 'de' ){
					formattedString = (dateObj.getDate()) +'.'+ (dateObj.getMonth()+1) +'.'+ (dateObj.getFullYear())
				} else {
					formattedString = timeValue;
				}

				return formattedString;
			}

			return times;
		}

	}
});