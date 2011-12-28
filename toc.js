$("body").append('<div id="placemark-hack"/>');
$("#placemark-hack").css({
    'background':'#555',
    'color':'white',
    'border':'1px solid black',
    'text-align':'right',
    'position':'fixed',
    'top':'2px',
    'right':'2px',
    'font-family':'Arial',
    'font-weight':'bold',
    'font-size':'8pt',
    'height':'2em'
});

(function( $ ){
    $.fn.binsearch = function(target, cmp) {  
        var lo = 0;
        var hi = this.length - 1;
        for (var i = 0; i < 100; i++) {
            var mid = Math.floor((lo + hi)/2);
            var test = cmp(this.eq(mid), target);
            if (test < 0)
                lo = mid + 1;
            else if (test > 0)
                hi = mid - 1;
            else
                return this.eq(mid);
        }
        return $();
    };
})( jQuery );

function compare(jqe, target) {
    var mytop = jqe.offset().top;
    var mybottom = mytop + jqe.height();
    if (mytop > target)
        return 1;
    if (mybottom < target)
        return -1;
    return 0;
}

$(document).scroll(function() {
    var cutoff = $(window).scrollTop() + 20;
    var name = $("dl").binsearch(cutoff, compare).find("dt").attr("id");
    if (name)
        $("#placemark-hack").text(name);
});


$(".sphinxsidebarwrapper").append('<h3>Contents</h3><div id="toc-hack"><ul/></div>');
$("img.inheritance").width(580);
$("tt.descname").each(
    function(i){
        var t=$(this);
        var module  = t.closest("div[id^=module]")
                        .attr("id")
                        .replace(/^module-/,'');
        var id      = t.closest("dt")
                        .attr("id");
        var myname  = id.replace(module + '.', '');
        var myclass = t.closest("dl").attr("class");
        var entry   = '<li class="' + myclass + '">' 
                        + '<a href="#' + id +'">' + myname  + '</a></li>'
        $("#toc-hack > ul").append(entry);
        if (0 == t.prevAll().length)
            t.before('<tt class="descclassname">' + 
                        myname.replace(t.text(),'') + '</tt>');
    }
)
