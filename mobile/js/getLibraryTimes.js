function getTimes(callback) {
			$.getJSON("http://anumat.com/hours", function(response) {
				return callback(response);
			}).fail(function(jqXHR, textStatus, errorThrown) { alert("Couldn't fetch library timings."); });
		}

		$(function() {
			var libId = $("body").attr('id');

			var weekday = new Array(7);
			weekday[0] = "monday";
			weekday[1] = "tuesday";
			weekday[2] = "wednesday";
			weekday[3] = "thursday";
			weekday[4] = "friday";
			weekday[5] = "saturday";
			weekday[6]=  "sunday";

			var lib;

			getTimes(function(times) {
				for (var i = 0; i < times.length; i++) {
					if (Number(times[i].id) == Number(libId)) {
						lib = times[i];
						break;
					}
				};
				
				if (lib.laptops > 0) {
					$("#laptops").show("slow");
					$("#num").html(lib.laptops);
				}
				
				for (var i = 0; i < weekday.length; i++) {
					$("#"+weekday[i] + " .open").html(lib[weekday[i]].open);
					$("#"+weekday[i] + " .close").html(lib[weekday[i]].close);
				};

				Date.prototype.getWeek = function(start) {
					start = start || 0;
					var today = new Date(this.setHours(0, 0, 0, 0));
					var day = today.getDay() - start;
					var date = today.getDate() - day;

					var StartDate = new Date(today.setDate(date +1));
					return [StartDate];
				}

				var Dates = new Date();
				var dayOfWeek = weekday[Dates.getDay()-1];

				Dates = Dates.getWeek();
				var startOfWeek = Dates[0].getDate();

				for (var i = 0; i < weekday.length; i++) {
					$("#" + weekday[i] + " .date").html(startOfWeek+i);
				};

				var scrollTo = $('#'+dayOfWeek).position().left;
				$('#timings').animate({'scrollLeft': scrollTo}, 800);
				$('#'+dayOfWeek).css("background-color", '#1AA1ED');
				$('#'+dayOfWeek).find('.date').css("color", 'white');

				

			});
		});