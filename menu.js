function makeTree(toc) {
    var output = $('ul#menu');
    while (toc.length == 1)
        toc = toc[0].contents;
    for (var i = 0; i < toc.length; i++)
        treeInsert(output, toc[i]);
    output.treeview({persist:'cookie',collapsed:true,unique:false,animated:'fast',control:'#treecontrol'});
}

function treeInsert(elem, context) {
    var parts = context.name.split('.');
    var name = parts.slice(parts.length - 2).join('.');
    if (context.what.match(/method|function/))
        name += '()';
    var title = context.name;
    if (context.what)
        title += ' (' + context.what + ')';
    var li = $('<li><a class="' + context.what + '" href="#" '
            + 'title="' + title + '" '
            + 'id="' + context.id + '">' + name + '</a></li>');
    li.appendTo(elem);
    if (context.contents.length > 0) {
        var sublist = $('<ul>').appendTo(li);
        for (var i = 0; i < context.contents.length; i++)
            treeInsert(sublist, context.contents[i]);
    }
}

function modulesMenu(modules) {
    console.log(modules);
    if (!modules)
        return;
    var dropDown = $('<select id="modules-index"><option>Modules</option></select>'
                    ).appendTo("#treecontrol");
    for (var i = 0; i < modules.length; i++) {
        var m = modules[i];
        dropDown.append('<option value="' + m[1] + '">' + m[0] + '</option>');
    }
    dropDown.change(function(e) {
        var url = $(this).val();
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendRequest(tab.id, {'action':'navigate', 'url':url});
            window.close();
        });
    });
}

function click() {
    var nav = this.id;
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action:'navigate', id:nav});
        window.close();
    });
    return false;
}

$(function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {'action':'get_toc'},
            function(response) {
                makeTree(response.toc);
                modulesMenu(response.modules);
            }
        );
    });
    $('a').live('click', click);
});
