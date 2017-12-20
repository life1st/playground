;(function () {

    var todoTaskBox = $('.todo-task-box'),
        doneTaskBox = $('.done-task-box')

    function addTask(data,id) {
        console.log('addTask',data, id)
        var todoTaskItemTpl =
            '<li data-id="'+id+'">' +
            '<label><input type="checkbox">'+data.title+'</label>' +
            '<div class="operate-box">' +
            '<button class="delete-btn">删除</button>' +
            '<button class="detail-btn">详情</button>' +
            '</div>' +
            '</li>'

        var doneTaskItemTpl =
            '<li data-id="'+id+'">' +
            '<label><input type="checkbox" checked>'+data.title+'</label>' +
            '<div class="operate-box">' +
            '<button class="delete-btn">删除</button>' +
            '<button class="detail-btn">详情</button>' +
            '</div>' +
            '</li>'

        data.check ?
            doneTaskBox.prepend(doneTaskItemTpl) :
            todoTaskBox.append(todoTaskItemTpl)

    }

//添加task
    var submitBtn = $('.add-task-box input[type=submit]')
    submitBtn.on('click', function () {
        var title = $('.add-task-box input[type=text]')
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
    body.on('click', '.main-content input[type=checkbox]', function () {
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
    })

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
            '<textarea>' +
            detail +
            '</textarea>' +
            '</div>' +
            '<label><input type="checkbox">提醒</label>' +
            '<div class="time">' +
            '</div>' +
            '<button type="submit">更新</button>' +
            '</div>'
        body.append(taskDetailTpl)

        $('.task-detail-box').find('input[type=checkbox]').on('click', function(){
            var $t = $(this),
                check = $t.prop('checked'),
                timeBox = $('.task-detail-box .time')

            var remindTpl = 
                '<input type="date" value="'+date+'">' +
                '<input type="time" value="'+time+'">'
            
            check ?
                timeBox.append(remindTpl) :
                timeBox.empty()
                
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


    $(document).ready(function () {
        initData()
    })
})();