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

			}else if(!!localStorage["dates"]&&!!localStorage["times"]){
				title.innerHTML = localStorage["titles"]||'标题';
				// countTime.innerHTML = localStorage["dates"]+" "+localStorage["times"]||'time';
                var date = localStorage["dates"].split("-"),
                    timeParse = date[0]+'/'+date[1]+'/'+date[2]+' '+localStorage["times"]+':00';
                var endTime = Date.parse(timeParse);

				var s = setInterval(function () {
				    var nowTime = new Date();
				    var times = endTime-nowTime.getTime();
				    var year = parseInt((times/(1000*60*60*24*365))<1?0:times/(1000*60*60*24*365)),
                        day = parseInt((times%(1000*60*60*24*365))/(1000*60*60*24)),
                        hour = parseInt(((times%(1000*60*60*24*365))%(1000*60*60*24))/(1000*60*60)),
                        minutes = parseInt((((times%(1000*60*60*24*365))%(1000*60*60*24))%(1000*60*60))/(1000*60)),
                        secends = parseInt(((((times%(1000*60*60*24*365))%(1000*60*60*24))%(1000*60*60))%(1000*60))/1000);

				    var texts = times>0?((year>=1?year+"年 ":"")+(day>=1?day+"天 ":"")+(hour>=1?hour+"小时 ":'')+(minutes>=1?minutes+"分 ":'')+(secends>=1?secends+'秒':'')):'时间到';
                    countTime.innerHTML = texts;
                },500)
			}
		}
		title.onclick = function(){
			window.location.replace("setcounttime.html");
		}

	};