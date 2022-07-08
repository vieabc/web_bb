$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nikename: function (value) {
            if (value.length > 6) {
                return " 长度必须在1-6位之间"
            }
        }
    })
    initUserinfo();
    function initUserinfo() {
        $.ajax({
            method: "get",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败");
                }
                console.log(res);
                form.val("userInfo", res.data);


            }
        })
    }
    $("#btn-reset").on("click", function (e) {
        e.preventDefault();
        initUserinfo();

    })
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败');
                }
                layer.msg('更新用户信息成功');
                //调用父页面的方法
                window.parent.getUserfo();
            }
        })
    })
})
