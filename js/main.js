	function transformTime(){
		var time = new Date();
		var timeString = time.getFullYear()+"年 "+time.getMonth()+"月 "+time.getDate()+"日  星期"+transformDay(time.getDay())+"<br />"+time.getHours()+"点 "+time.getMinutes()+"分 "+time.getSeconds()+"秒 <br />"/*+time.getMilliseconds()*/;
		return timeString;
	}
	function transformDay(day){
		switch (day){
			case 1:
				return "一";
				break;
			case 2:
				return "二";
				break;
			case 3:
				return "三";
				break;
			case 4:
				return "四";
				break;
			case 5:
				return "五";
				break;
			case 6:
				return "六";
				break;
			case 7:
				return "日";
				break;
			default:
				return day;
		}
	}

	window.onload = function(){
		var title = document.getElementById("title"),
			countTime = document.getElementById("countTime");
		/*设置现在时间*/
		var i = 0;
		var t = setInterval(function(){
					// console.log(transformTime())
					document.getElementById('time').innerHTML = transformTime();
		},500);
		if(!!window.localStorage){
			console.log(localStorage.length);
			if(!localStorage["titles"]&&!localStorage["dates"]&&!localStorage["times"]){

				var button = document.createElement("a");
				button.appendChild(document.createTextNode("添加倒计时"));
				document.getElementsByTagName("body")[0].appendChild(button);
				console.log(button);
				button.href = "setcounttime.html";
				button.setAttribute("class","settime");
				/*button.onclick=function(){
					console.log('onclick')
				}*/
			}else if(!!localStorage["dates"]&&!!localStorage["times"]){
				title.innerHTML = localStorage["titles"]||'标题';
				// countTime.innerHTML = localStorage["dates"]+" "+localStorage["times"]||'time';
                var date = localStorage["dates"].split("-"),
                    time = localStorage["times"].split(":");
                console.log(date,time)
				var s = setInterval(function () {
				    var times = new Date();
                    var year = date[0]-times.getFullYear(),
                        month = date[1]-times.getMonth(),
                        day = date[2]-times.getDay(),
                        hour = time[0]-times.getHours(),
                        minutes = time[1]-times.getMinutes();
				    var text = (year>0?year+"年 ":"")+(month>0?month+"月 ":"")+(day>0?day+"天 ":"")+(hour>0?hour+"小时 ":'')+(minutes>0?minutes+"分 ":'')+(60-times.getSeconds()+'秒');
                    countTime.innerHTML = text;
                },500)
			}
		}
		title.onclick = function(){
			window.location.replace("setcounttime.html");
		}

	}