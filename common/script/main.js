;(function () {

    var todoTaskBox = $('.todo-task-box'),
        doneTaskBox = $('.done-task-box')

    function addTask(data,id) {
        console.log('addTask',data, id)
        var todoTaskItemTpl =
            '<li data-id="'+id+'">' +
            '<label><input type="checkbox" class="check-to-do">'+data.title+'</label>' +
            '<div class="operate-box">' +
            '<button class="delete-btn btn attention">删除</button>' +
            '<button class="detail-btn btn accept">详情</button>' +
            '</div>' +
            '</li>'

        var doneTaskItemTpl =
            '<li data-id="'+id+'">' +
            '<label><input type="checkbox" checked class="check-to-do">'+data.title+'</label>' +
            '<div class="operate-box">' +
            '<button class="delete-btn btn attention">删除</button>' +
            '<button class="detail-btn btn accept">详情</button>' +
            '</div>' +
            '</li>'

        data.check ?
            doneTaskBox.prepend(doneTaskItemTpl) :
            todoTaskBox.append(todoTaskItemTpl)

    }

//添加task
    var submitBtn = $('.add-task-box input[type=submit]')
    submitBtn.on('click', function () {
        var title = $('.add-task-box').find('input[type=text]')
        if (title.val() === '') return;
        var data = {
            title: title.val(),
            check: false
        }
        var id = Math.floor((new Date().getTime())*Math.random())
        addTask(data,id)
        store.set(id,data)
        title.val('')
    })

//---------


    var body = $('body')
//check
    body.on('click', '.main-content .check-to-do', function () {
        var $t = $(this),
            item = $t.parent().parent(),
            id = item.data(id).id,
            check = $t.prop('checked')

        check ?
            doneTaskBox.prepend(item.clone()) :
            todoTaskBox.append(item.clone())

        var data = store.get(id)
        data.check = check
        console.log('data,',data, id)
        store.set(id, data)
        item.remove()
    })

//----------

//删除
    body.on('click', '.delete-btn', function () {
        if (!confirm('是否删除这条待办事项？')) return

        var $t = $(this),
            item = $t.parent().parent(),
            id = item.data(id).id
        store.remove(id)
        item.remove()
        toast({
            ctx: '删除成功'
        }).show()
    })

//详情
    body.on('click', '.detail-btn', function () {
        $('.task-detail-box').remove()

        var $t = $(this),
            item = $t.parent().parent(),
            id = item.data(id).id

        showDetail(id)
    })

    //更新详情
    body.on('click', '.task-detail-box button[type=submit]', function(){
        var $t = $(this),
            item = $('.task-detail-box'),
            id = item.data(id).id,
            detail = $('.detail textarea').val(),
            dateTime = $('#laydate').val()

        var data = store.get(id)
        console.log(data,id)


        data.detail = detail ? detail : ''
        data.dateTime = dateTime ?dateTime : ''

        store.set(id, data)
        $('.task-detail-box').fadeOut(100, function(){
            $(this).remove()
        })
        toast({
            ctx: '更新成功'
        }).show()
    })

    var contentBox = $('.main-content')
    function showDetail(id) {
        var data = store.get(id)
        var title = data.title,
            detail = data.detail || '',
            dateTime = data.dateTime || ''

        var taskDetailTpl =
            '<div class="task-detail-box" data-id='+id+'>' +
            '<div class="title"><p>' +
            title +
            '</p></div>' +
            '<div class="detail">' +
            '<textarea maxlength="140">' +
            detail +
            '</textarea>' +
            '</div>' +
            '<div class="time">' +
            '<label id="laydateEvent"><input type="checkbox">提醒</label>' +
            '<input type="text" id="laydate" readonly value="'+dateTime+'">' +
            '</div>' +
            '<button type="submit" class="btn accept">更新</button>' +
            '<button class="close-detail-btn btn attention">关闭</button>' +
            '</div>'
        body.append(taskDetailTpl)


        //关闭详情
        var tDB = $('.task-detail-box')
        $('.close-detail-btn').on('click', function () {
            tDB.fadeOut(150, function () {
                tDB.remove()
            })
        })

        //提醒功能
        remind();

    }

    //提醒功能
    function remind() {

        var checkNode = $('.task-detail-box').find('input[type=checkbox]'),
            check = checkNode.prop('checked')
        var dateNode = $('#laydate')
        if (!check) {
            dateNode.attr('disable','disable')
        }else {
            //时间组件
            laydate.render({
                elem: '#laydate',
                type: 'datetime',
                eventElem: '#laydateEvent'
            })
        }
        checkNode.on('click', function(){
            var $t = $(this),
                check = $t.prop('checked'),
                timeBox = $('.task-detail-box .time')
            if (check){
                //时间组件
                laydate.render({
                    elem: '#laydate',
                    type: 'datetime',
                })
            }
        })
    }
//清空
    var clearBtn = $('.add-task-box button[type=button]')
    clearBtn.on('click', function () {
        if (!confirm('是否清空所有待办事项？')) return

        store.clearAll();
        window.location.reload()
    })
//初始化所有数据
    function initData() {
        if (!localStorage) return
        var data = []
        store.each(function (val, key) {
            addTask(val, key)
        })
    }
//加载提醒音频文件
    function loadAudio() {
        var audioNode = document.createElement('audio')
        audioNode.src = './common/audio/alert.mp3'
        document.body.appendChild(audioNode)
    }
    function alert() {
        
    }

    $(document).ready(function () {
        initData()
        setTimeout(function () {
            loadAudio()
        },300)


    })
})();

function toast(obj) {
    //样式：toast.less
    var o = {}
    o.ctx = obj.ctx || ''
    o.timeout = obj.timeout || 1400
    var tpl =
        '<div class="toast">' +
        '<p>' +
        o.ctx +
        '</p>' +
        '</div>'
    this.show = function () {
        var body = $('body')
        body.append(tpl)
        var t = setTimeout(function () {
            var toast = $('.toast')
            toast.fadeOut(200, function () {
                toast.remove()
            })
            clearTimeout(t)
        },o.timeout)
    }

    return this
}