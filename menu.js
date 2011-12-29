function makeMenu(response) {
    var toc = response.toc;
    var output = $('ul#menu');
    if (toc.length == 1)
        toc = toc[0].contents;
    for (var i = 0; i < toc.length; i++)
        moduleList(output, toc[i]);
    output.treeview({persist:'cookie',collapsed:true,unique:false,animated:'fast',control:'#treecontrol'});
}

function moduleList(elem, context) {
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
            moduleList(sublist, context.contents[i]);
    }
}
