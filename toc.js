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

var page_toc = [];
var context_stack = [page_toc];
var moduleName;

function doModule(i) {
    moduleName = this.id.replace(/^module-/,''); 
    var entry = {'what':'module','id':this.id,'name':moduleName};
    addItem(entry);
}
function addItem(toc_entry) {
    toc_entry.contents = [];
    context_stack[0].push(toc_entry);
    context_stack.unshift(toc_entry.contents);
    doContents(toc_entry.name);
    context_stack.shift();
}
function doContents(name) {
    var num_parts = name.split('.').length;
    $('dt[id^=' + name + '.]').each(function(i) {
        var name = this.id;
        if (name.split('.').length != num_parts + 1)
            return;
        var what = this.parentNode.className;
        var entry = {'what':what,'id':name,'name':name};
        addItem(entry);
    });
}

if ($(".sphinxsidebarwrapper").length) {
    $("body").append('<div id="placemark-hack"/>');
    $(document).scroll(function() {
        var cutoff = $(window).scrollTop() + 20;
        var name = $("dl").binsearch(cutoff, compare).find("dt").attr("id");
        if (name)
            $("#placemark-hack").text(name);
    });

    $("img.inheritance").width(580);

    $("div.section[id^=module]").each(doModule);
    chrome.extension.sendRequest({'toc': page_toc});
    chrome.extension.onRequest.addListener(
        function onExtRequest(request, sender, sendResponse) {
            if (request.action == "navigate") {
                location.hash = "#" + request.id;
                sendResponse([]);
            }
        }
    );
}
