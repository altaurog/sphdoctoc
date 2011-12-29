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
var names_dict = {'':page_toc};
var moduleName;

function doModule(i) {
    moduleName = this.id.replace(/^module-/,''); 
    var entry = {'what':'module','id':this.id,'name':moduleName};
    addItem(entry);
}
function parentName(name) {
    var parts = name.split('.');
    return parts.slice(0, parts.length - 1).join('.');
}
function addItem(toc_entry) {
    names_dict[toc_entry.name] = toc_entry.contents = [];
    var p = parentName(toc_entry.name);
    if (!names_dict[p])
        addItem({'what':'', 'id':'', 'name':p});
    names_dict[p].push(toc_entry);
}
function doContents(i) {
    var name = this.id;
    var what = this.parentNode.className;
    var entry = {'what':what,'id':name,'name':name};
    addItem(entry);
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
    $("dt[id]").each(doContents);
    names_dict = {};
    var len = page_toc.length
    for (var i = 0; i < len; i++) {
        var item = page_toc.shift();
        if (item.what != 'module' || item.contents.length > 0)
            page_toc.push(item);
    }
    chrome.extension.sendRequest({'toc': page_toc});
    console.log(JSON.stringify({'toc': page_toc}));
    chrome.extension.onRequest.addListener(
        function onExtRequest(request, sender, sendResponse) {
            if (request.action == "navigate") {
                location.hash = "#" + request.id;
                sendResponse([]);
            }
        }
    );
}
