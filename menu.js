function makeMenu(response) {
    var data = response.data;
    console.log(data.length);
    var contextstack = [{klass:['top','top','top'], content:[]}];
    for (i=0; i < data.length; i++) {
        var rec = data[i];
        if (rec[0].match(/method|attribute/)) {
            contextstack[0].content.push(rec)
        }
        else if (rec[0] == 'class') {
            var current = contextstack[0].klass[1];
            var newcontext = {klass:rec, content:[]}
            while (!(current == 'top' || rec[1].match(current + '\.'))) {
                console.log('-'+ current + ", " + rec[1]);
                contextstack.shift();
                current = contextstack[0].klass[1];
            }
            console.log('>'+ current + ", " + rec[1]);
            contextstack[0].content.push(newcontext);
            contextstack.unshift(newcontext);
        }
    }
    var output = $('ul#menu');
    var topcontent = contextstack[contextstack.length - 1].content;
    for (var i = 0; i < topcontent.length; i++)
        moduleList(output, topcontent[i]);
    output.treeview({persist:'location',collapsed:true,unique:true});
}

function moduleList(elem, context) {
    if (context.klass) {
        var li = $('<li><a class="' + context.klass[0] + '" href="#" id="' + context.klass[1] + '">' + context.klass[2] + '</a></li>');
        li.appendTo(elem);
        var sublist = $('<ul>').appendTo(li);
        for (var i = 0; i < context.content.length; i++)
            moduleList(sublist, context.content[i]);
    }
    else {
        var li = $('<li><a class="' + context[0] + '" href="#" id="' + context[1] + '">' + context[2] + '</a></li>');
        li.appendTo(elem);
    }
}
