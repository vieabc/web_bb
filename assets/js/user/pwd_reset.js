$(function () {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        latepwd: function (value) {
            if (value === $("[name=oldpwd]").val()) {
                return '新旧密码不能相同';
            }
        },
        relatepwd: function (value) {
            if (value !== $("[name=newpwd]").val()) {
                return "两次密码不一致"
            }
        }

    })
    $('.layui-form').on("submit", function (e) {
        e.preventDefault();
        // console.log(11);
        /* $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            timeout: 5000,
            data: $(this).serialize(),

            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg("更新密码失败");
                }
                layui.layer.msg("更新密码成功");
                $('.layui-form')[0].reset();

            }

        }) */
        var xhr = new XMLHttpRequest;
        xhr.open('post', "http://www.liulongbin.top:3007/my/updatepwd");
        xhr.setRequestHeader('token', localStorage.getItem("token"));
        var data = $(this).serialize();

        xhr.send("data");

        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState === 4) {
                console.log(xhr.responseText);
            }
        }
    })

})