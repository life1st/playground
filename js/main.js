	function transformTime(){
		var time = new Date();
		var timeString = time.getFullYear()+"年 "+(time.getMonth()+1)+"月 "+time.getDate()+"日  星期"+transformDay(time.getDay())+"<br />"+time.getHours()+"点 "+time.getMinutes()+"分 "+time.getSeconds()+"秒 <br />";
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
		var t = setInterval(function(){
            document.getElementById('time').innerHTML = transformTime();
		},500);

		if(!!window.localStorage){
			if(!localStorage["titles"]&&!localStorage["dates"]&&!localStorage["times"]){
				var button = document.createElement("a");
				button.appendChild(document.createTextNode("添加倒计时"));
				document.getElementsByTagName("body")[0].appendChild(button);
				button.href = "setcounttime.html";
				button.setAttribute("class","settime");

			}else if(!!localStorage["dates"]&&!!localStorage["times"]){
			    document.getElementById("time").style.display = "none";
			    clearInterval(t);
				title.innerHTML = (!!localStorage["titles"]?'离&nbsp'+localStorage["titles"]+'&nbsp还有：':'标题');
                var date = localStorage["dates"].split("-"),
                    timeParse = date[0]+'/'+date[1]+'/'+date[2]+' '+localStorage["times"]+':00';

                var endTime = Date.parse(timeParse);

                countTime.innerHTML="<time id=\"year\"></time><time id=\"day\"></time><time id=\"hour\"></time><time id=\"minutes\"></time><time id=\"seconds\"></time>";
				var	tYear = document.getElementById("year"),
					tDay = document.getElementById("day"),
					tHour = document.getElementById("hour"),
					tMinutes = document.getElementById("minutes"),
					tSeconds = document.getElementById("seconds");

                /*设置倒计时*/
				var s = setInterval(function () {
				    var nowTime = new Date();
				    var times = endTime-nowTime.getTime();
				    var year = Math.floor(times/(1000*60*60*24*365)),
                        day = Math.floor((times%(1000*60*60*24*365))/(1000*60*60*24)),
                        hour = Math.floor(((times%(1000*60*60*24*365))%(1000*60*60*24))/(1000*60*60)),
                        minutes = Math.floor((((times%(1000*60*60*24*365))%(1000*60*60*24))%(1000*60*60))/(1000*60)),
                        seconds = Math.floor(((((times%(1000*60*60*24*365))%(1000*60*60*24))%(1000*60*60))%(1000*60))/1000);

                    if (times<0) {
                        clearInterval(s);
                        tSeconds.style.display="none";
                        countTime.innerHTML = "时间到";
                    }else{
                    	tYear.innerHTML = (year>=1?year:tYear.style.display="none");
                    	tDay.innerHTML = (day>=1?day:tDay.style.display="none");
                    	tHour.innerHTML = (hour>=1?hour:tHour.style.display="none");
                    	tMinutes.innerHTML = (minutes>=1?minutes:tMinutes.style.display="none");
                    	tSeconds.innerHTML = (seconds>=10?seconds:'0'+seconds);
                    }
                },500)
			}
		}

		title.onclick = function(){
			window.location.replace("setcounttime.html");
		}
	};