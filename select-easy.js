SelectEasy.config = {};
SelectEasy.run = function (array, config) {
    SelectEasy.config = config;
    var selectId = document.getElementById(SelectEasy.config.id);
    selectId.appendChild(SelectEasy.render(array));
    SelectEasy.load();
}

SelectEasy.render = function (array) {
    if (!Array.isArray(array) || array.length <= 0) { return "" }
    var div = SelectEasy.CreatElement('div');
    array.forEach(function (item, i) {
        var span = SelectEasy.CreatElement('span');
        var ul = SelectEasy.CreatElement('ul');
        var li = SelectEasy.CreatElement('li');
        var a = SelectEasy.CreatElement('a');
        var img = SelectEasy.CreatElement('img');
        span.innerHTML = item.name;
        if (item.children) {
            a.appendChild(img);
        } else {
            a.onclick = function () {
                SelectEasy.config.callBack(item.id)
            }
        }

        a.appendChild(span);
        li.id = item.id;
        li.appendChild(a);
        if (item.children) {
            li.appendChild(SelectEasy.render(item.children));
        }
        ul.appendChild(li);
        div.appendChild(ul);
    });
    return div;
}

SelectEasy.CreatElement = function (e) {
    var eve = document.createElement(e);
    switch (e) {
        case 'ul':
            eve.className = 'selectUl';
            break;
        case 'li':
            eve.className = 'selectLi';
            break;
        case 'div':
            eve.className = 'accordion';
            break;
        case 'img':
            eve.className = 'imgs';
            eve.src = './right.png';
            break;
        case 'a':
            eve.className = 'selectImg';
            eve.href = "javascript:;";
            break;
    }
    return eve;
}

SelectEasy.load = function () {
    var selectA = document.getElementsByClassName('selectLi');
    for (let a of selectA) {
        a.addEventListener('click', SelectEasy.AddEvtListener, false);
    }
}

SelectEasy.AddEvtListener = function (e) {
    e.stopPropagation();
    var obox = this.children;
    var img = obox[0].getElementsByClassName('imgs')[0];
    if (obox[1]) {
        if (obox[1].classList.contains('block')) {
            obox[1].classList.remove('block');
            img.src = SelectEasy.config.iocn1;
        } else {
            obox[1].classList.add('block');
            img.src = SelectEasy.config.iocn2;
        }
    }
}

function SelectEasy() { };

if (typeof module === "object" ) {
    module.exports = SelectEasy;
}
