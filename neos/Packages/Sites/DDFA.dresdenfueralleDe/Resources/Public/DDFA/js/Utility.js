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

			var vocabDateFrom = APP.getLM().resolve('prop_dateFrom');
			var vocabDateTo = APP.getLM().resolve('prop_dateTo');
			var vocabTimeFrom = APP.getLM().resolve('prop_timeFrom');
			var vocabTimeTo = APP.getLM().resolve('prop_timeTo');
			var vocabTimeAt = APP.getLM().resolve('prop_timeAt');


			if( dateFrom && timeFrom && dateTo && timeTo){
				times += vocabDateFrom + ' ' + dateFrom + ' ' +vocabTimeAt+ ' ' + timeFrom + '<br>';
				times += vocabDateTo + ' ' + dateTo + ' ' + vocabTimeAt + ' ' + timeTo;
			}
			else if( dateFrom && timeFrom && timeTo){
				times += dateFrom + ' ' + vocabTimeFrom + ' ' + timeFrom + ' ' +vocabTimeTo+ ' ' + timeTo;
			}
			else if( dateFrom && timeFrom){
				times += dateFrom + ' ' +vocabTimeAt+ ' ' + timeFrom;
			}
			else if( dateFrom && dateTo){
				times += vocabDateFrom + ' ' + dateFrom + ' ' +vocabDateTo+ ' ' + dateTo;
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