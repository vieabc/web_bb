$(function () {
    $(".login-end").on('click', function () {
        $(".login-box").hide();
        $('.reg-box').show();
    })


    $(".reg-end").on('click', function () {
        $(".login-box").show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        //自定义一个psw的校验规则
        psw: [/^[\S]{6,12}$/, "密码6-12位且不能出现空格"],
        // 校验两次密码是否一致
    })



    //监听注册表单
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var repsw = $("#repsw").val();
        var psw = $("#psw").val();
        /*  console.log(repsw);
         console.log(psw); */
        if (repsw !== psw) {
            // console.log(11);
            alert('两次密码不一致');
            return "两次密码不一致";
        }



        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);

            }
            layer.msg('注册成功,请登录');
            $('.link-login').click();

        })

    })
    $('#form_login').on("submit", function (e) {
        e.preventDefault();
        $.post("/api/login", { username: $("#form_login [name=username]").val(), password: $("#form_login [name=password]").val() }, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg("登录失败");
            }
            layer.msg("登录成功");
            localStorage.setItem("token", res.token);
            location.href = "./index.html";

        })
    })

})
