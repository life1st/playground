;(function() {
    var config = {
        needCopy: false,

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
        var copyBtn = config.needCopy ? `<span class='copy-btn'>复制</span></p>` : ''
        var tpl = 
        `<div class='mask'>
            <div class='guide'>
                
            </div>
            <div class='remind'>
                你正在访问的地址:
                <p class='copyLink'>${href} ${copyBtn}</p>
                已停止支持微信。<br>
                请复制本链接或在右上角菜单中选择在'浏览器中打开'。
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
            .copy-btn {
                text-decoration: underline;
            }
        `
            
        var body = document.querySelector('body')
        var head = document.querySelector('head')
        head.innerHTML += '<style>' + styl + '</style>'
        body.innerHTML += tpl
        if (config.needCopy) {
            var copy = document.querySelector('.copy-btn')
            //todo
        }
        return this
    }
    
    window.addEventListener('load', function() {
        if (isWeixinBrowser()) {
            var href = window.location.href
            renderDom(href)
        }
    })
})()
