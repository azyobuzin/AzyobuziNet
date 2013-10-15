var homePage = true;

var loadPage = function (href, push) {
    $("#container").load(href + " #content", function () {
        document.title = $("#pagetitle").text()
        if (push) history.pushState(href, document.title, href);
        _gaq.push(["_trackPageview", href]);
        $("#container").fadeIn("fast");
    });
};

var linkClicked = function (href, push) {
    if (homePage) {
        $("#white").css("width", 0)
            .css("display", "block")
            .animate({ "width": "100%" }, 300, function () {
                $("#title").css("display", "none");
                $("header").css("width", 0);
                $("nav").addClass("mininav").css("width", 0);
                $("#white").css("display", "none");
                $("nav").animate({ "width": 300 }, "fast", function () {
                    $("header").css("width", 300);
                    homePage = false;
                    loadPage(href, push);
                });
            });
    } else {
        $("#container").fadeOut("fast", function () {
            loadPage(href, push);
        });
    }
};

var goHome = function (push) {
    if (!homePage) {
        $("nav").fadeOut("fast", function () {
            $("header").animate({ "width": "100%" }, "fast", function () {
                $("#title").fadeIn("fast", function () {
                    $("nav").removeClass("mininav").css("width", "100%")
                        .fadeIn("fast", function () {
                            homePage = true;
                            document.title = "AzyobuziNet"
                            if (push) history.pushState("/", document.title, "/");
                            _gaq.push(["_trackPageview", "/"]);
                            $("#container").css("display", "none");
                        });
                });
            });
        });
    }
};

$(function () {
    $(".link").click(function () {
        linkClicked(this.href, true);
        return false;
    });

    $(".home").click(function () {
        goHome(true);
        return false;
    });    
});

addEventListener("popstate", function (event) {
    var href = event.state;
    if (href == "/") goHome(false);
    else if (href != null) linkClicked(href, false);
}, false);
