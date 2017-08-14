window.onload = function(){
    var title = document.getElementById("titles"),
        date = document.getElementById("dates"),
        time = document.getElementById("times"),
        submit = document.getElementById("submitIt"),
        cleardata = document.getElementById("cleardata");

    /*初始化*/
    var date = new Date(),
        month = "";
    date.getMonth()<10?month = "0"+date.getMonth():month = date.getMonth();
    times.value = date.getFullYear()+"-"+month+"-"+date.getDate();
    title.value = localStorage["titles"]||'';

    submit.onclick = function(){
        console.log(title.value);
        localStorage["titles"] = title.value;
        localStorage["dates"] = date.value;
        localStorage["times"] = time.value;
        window.location.replace("index.html");
    }
    cleardata.onclick = function(){
        alert("清除成功");
        localStorage.clear();
        window.location.reload();
    }
}