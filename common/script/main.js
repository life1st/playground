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
    })

//详情
    body.on('click', '.detail-btn', function () {
        $('.task-detail-box').hide(200, function () {
            this.remove()
        })
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
            detail = $('.detail textarea').val()

        var data = store.get(id)
        console.log(data,id)

        if (detail) {
            data.detail = detail
        }

        store.set(id, data)
        $('.task-detail-box').fadeOut(100, function(){
            $(this).remove()
        })
        toast({
            ctx: '添加成功'
        }).show()
    })

    var contentBox = $('.main-content')
    function showDetail(id) {
        var data = store.get(id)
        var title = data.title,
            detail = data.detail || '',
            date = data.date || '',
            time = data.time || ''

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
            '<label><input type="checkbox">提醒</label>' +
            '<div class="time">' +
            '<input type="date" value="'+date+'">' +
            '<input type="time" value="'+time+'">' +
            '</div>' +
            '<button type="submit" class="btn accept">更新</button>' +
            '<button class="close-detail-btn btn attention">关闭</button>' +
            '</div>'
        contentBox.append(taskDetailTpl)

        var tDB = $('.task-detail-box')
        $('.close-detail-btn').on('click', function () {
            tDB.fadeOut(150, function () {
                tDB.remove()
            })
        })
        
/*        //提醒功能
        $('.task-detail-box').find('input[type=checkbox]').on('click', function(){
            var $t = $(this),
                check = $t.prop('checked'),
                timeBox = $('.task-detail-box .time')
            var timer = setInterval(function () {
                
            }) 
        })*/
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


    $(document).ready(function () {
        initData()
    })
})();

function toast(obj) {
    //样式：toast.less
    var o = {}
    o.ctx = obj.ctx || ''
    o.timeout = obj.timeout || 1600
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