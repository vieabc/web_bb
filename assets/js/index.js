$(function () {
    getUserfo();
    $("#btnLoginout").on("click", function () {
        layui.layer.confirm("确定退出吗？", { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem("token");
            location.href = "/login.html";
            // console.log(index);
            layer.close(index);

        });

    })

})
function getUserfo() {
    $.ajax({
        url: "/my/userinfo",
        method: "get",
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg("获取信息失败");
            }
            renderimg(res.data);

        },
        //无论成功或者失败 都会调用complete 限制没登陆的用户加入主页

    })
}
function renderimg(user) {
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;" + name);
    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avater").hide();


    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avater").html(first).show();
    }

}