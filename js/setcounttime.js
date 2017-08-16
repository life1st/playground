window.onload = function(){
    document.getElementsByTagName('body')[0].style.height = window.screen.height+"px";
    var title = document.getElementById("titles"),
        dates = document.getElementById("dates"),
        time = document.getElementById("times"),
        submit = document.getElementById("submitIt"),
        cleardata = document.getElementById("cleardata");

    /*初始化*/
    var date = new Date(),
        month = "";
    date.getMonth()<10?month = "0"+(date.getMonth()+1):month = date.getMonth()+1;

    title.value = localStorage["titles"]||'';
    dates.value = localStorage["dates"]||date.getFullYear()+"-"+month+"-"+date.getDate();
    time.value = localStorage["times"]||date.getHours()+":"+date.getMinutes();

    submit.onclick = function(){
        console.log(title.value);
        localStorage["titles"] = title.value;
        localStorage["dates"] = dates.value;
        localStorage["times"] = time.value;
        window.location.replace("index.html");
    }
    cleardata.onclick = function(){
        localStorage.clear();
        alert("清除成功");
        window.location.replace("index.html");
    }
}