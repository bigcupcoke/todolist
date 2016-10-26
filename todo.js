var log = function() {
    console.log.apply(console, arguments)
}
//  todo 应用
var templeteTodo = function(todo) {
    var t = `
    <div class="todo-cell">
        <span class="input-span">${todo.task}</span>
        <span class="current-time">${todo.time}</span>
        <div class="dj-buttons vertical-center">
            <button class="dj-button-done btn btn-success">Done</button>
            <button class="dj-button-delete btn btn-danger">Delete</button>
            <button class="dj-button-edit btn btn-primary">Edit</button>
        </div>
    </div>
    `
    return t
}

var time = function() {
    var d = new Date()
    var year = d.getFullYear()
    var mon = d.getMonth() + 1
    var day = d.getDate()
    var min = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    var time = `${year}/${mon}/${day}/ ${min}`
    return time
}

var bindEventAdd = function() {
    $('#id-button-add').on('click', function() {
        let task = $('.dj-input').val()
        let currentTime = time()
        let todo = {
            task: task,
            time: currentTime,
            done: 'false'
        }
        let t = templeteTodo(todo)
        $('.dj-todolist').append(t)
        todoList.push(todo)
        saveTodos()
        log(todoList)
        log(localStorage.todoList)
    })
}

var bindEventDeleteAll = function() {
    $('#id-button-deleteAll').on('click', function() {
        $('.todo-cell').each(function(i, e) {
            $(this).remove()
        })
        todoList = []
        saveTodos()
    })
}

var bindEventDone = function() {
    $('.dj-todolist').on('click', '.dj-button-done', function() {
        let span = $(this).closest('.todo-cell').find('.input-span')
        span.toggleClass('active')
        let time =  $(this).closest('.todo-cell').find('.current-time')
        time.toggleClass('active')
        let i = $(this).closest('.todo-cell').index()
        todoList[i].done = span.hasClass('active')
        saveTodos()
        log(todoList)
    })
}

var bindEventDelete = function() {
    $('.dj-todolist').on('click', '.dj-button-delete', function() {
        let i = $(this).closest('.todo-cell').index()
        $(this).closest('.todo-cell').remove()
        todoList.splice(i, 1)
        saveTodos()
        log(localStorage.todoList)
    })
}

var bindEventEdit = function() {
    $('.dj-todolist').on('click', '.dj-button-edit', function() {
        let span = $(this).closest('.todo-cell').find('.input-span')
        span.attr('contenteditable', 'true')
        span.focus()
    })
}

var bindEventEnter = function() {
    $('.dj-todolist').on('keydown', '.input-span', function() {
        if (event.which === 13) {
            var self = $(this)
            saveSpan(self)
        }
    })
}

var saveSpan = function(self) {
    $(self).attr('contenteditable', 'false')
    let i = $(self).closest('.todo-cell').index()
    let text = $(self).text()
    todoList[i].task = text
    saveTodos()
}

var bindEventBlur = function() {
    $('.dj-todolist').on('blur', '.input-span', function() {
        var self = $(this)
        saveSpan(self)
    })
}

var saveTodos = function() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

var loadTodos = function() {
    var s = localStorage.todoList
    return JSON.parse(s)
}

var initTodos = function() {
    todoList = loadTodos()
    $(todoList).each(function(i, e) {
        let t = templeteTodo(e)
        $('.dj-todolist').append(t)
        if(e.done) {
            let span = $($('.input-span')[i])
            span.toggleClass('active')
            let time = $($('.current-time')[i])
            time.toggleClass('active')
        }
    })
}

bindEvents = function() {
    bindEventAdd()
    bindEventDeleteAll()
    bindEventEdit()
    bindEventBlur()
    bindEventEnter()
    bindEventDelete()
    bindEventDone()
}

var __main = function() {
    initTodos()
    bindEvents()
}

var todoList = []
__main()

// 调用日历控件
var implateDatePicker = function() {
    $('#date').DatePicker({
        flat: true,
        date: ['1','1'],
        calendars: 2,
        mode: 'range',
        starts: 1
    })
}
implateDatePicker()
