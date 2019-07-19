/**
 * Created by Yang on 2017/7/8.
 */
window.onload=function () {
    waterfall('main','box');
    var dataInt = {"data":[{"src":'images/0.jpg'},{"src":'images/1.jpg'},
        {"src":'images/2.jpg'},{"src":'images/3.jpg'}]}
    window.onscroll=function () {
        if(checkScrollSlide){
            var oParent = document.getElementById('main');
            //将数据块渲染到页面尾部
            for(var i=0;i<dataInt.data.length;i++){
                var oBox = document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src=dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
}

function waterfall(parent,box) {
    //将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent,box);

    var hArr = [];
    for(var i=0;i<oBoxs.length;i++){
        if(i<3){
            hArr.push(oBoxs[i].offsetHeight);
        }else {
            var minH = Math.min.apply(null,hArr);
            var index = getMinhIndex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
}

//根据class获取元素
function getByClass(parent,claName) {
    var boxArr = new Array(),
        oElements=parent.getElementsByTagName('*');
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==claName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex(arr,val) {
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}

//检测是否具备加载数据块的条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent,'box');
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;
}