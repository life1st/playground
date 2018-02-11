;(function() {
    var config = {
        needCopy: true,

    }
    var isWeixinBrowser = function() {
        var ua = window.navigator.userAgent
        if (ua.toLowerCase().match('micromessenger')){
            return true
        }else {
            return false
        }
    }

    var renderDom = function(href) {
        var tpl = 
        `<div class='mask'>
            <div class='guide'>
                
            </div>
            <div class='remind'>
                你正在访问的地址:
                <p class='copyLink'>${href}</p>
                已停止对微信的服务， 请选择在浏览器中打开或复制本链接。
            </div>
        </div>`
        var styl = 
        `   .mask {
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: #fff;
                z-index: 1000;
            }
            .remind {
                margin: 30% 20px 0;
            }
        `
            
        var body = document.querySelector('body')
        var head = document.querySelector('head')
        head.innerHTML += '<style>' + styl + '</style>'
        body.innerHTML += tpl
        
        return this
    }
    
    window.addEventListener('load', function() {
        if (isWeixinBrowser()) {
            var href = window.location.href
            renderDom(href)
        }
    })
})()
