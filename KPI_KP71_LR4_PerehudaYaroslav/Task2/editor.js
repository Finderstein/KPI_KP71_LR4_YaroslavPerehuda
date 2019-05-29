let ID = 0;

function isNumeric(str)
{
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++)
    {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58)) return false;
    }
    return true;
};
function getRandomColor()
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];

    return color;
} 

function Add(event)
{
    event.preventDefault();

    let arrayOfInput = document.getElementById('form').getElementsByClassName('input');

    const key = arrayOfInput[0].value;
    const value = arrayOfInput[1].value
    arrayOfInput[0].value = arrayOfInput[1].value = '';
    const color = getRandomColor();

    const isValid0 = key !== '';
    const isValid1 = isNumeric(value) && value !== '';

    arrayOfInput[0].style.border = isValid0 ? "1px solid gray" : "2px solid red";
    arrayOfInput[1].style.border = isValid1 ? "1px solid gray" : "2px solid red";
    if(!isValid0 || !isValid1) return;

    let template = document.getElementsByTagName("template")[0];
    let clon = template.content.cloneNode(true);
    
    clon.getElementById("key").innerHTML = key;
    clon.getElementById("value").innerHTML = value;
    clon.getElementById("key_input").value = key;
    clon.getElementById("value_input").value = value;
    clon.getElementById("color_input").value = color;
    clon.getElementById("id_input").value = ID;
    clon.getElementById("button").addEventListener('click', Remove, false);
    clon.getElementById("table_line").addEventListener('click', Remove, false);

    document.getElementById('table').appendChild(clon);

    AddToDiagram(ID, key, value, color)

    ID++;
}

function Remove(event)
{
    if(event.currentTarget.id == "button") return;

    if(event.target.id == "button")
    {
        let id = event.currentTarget.childNodes[1].childNodes[9].value;
        event.currentTarget.remove();
        RemoveFromDiagram(id);
    }
}

function DiagramUpdate()
{
    let GetVal = (item) => item.childNodes[1].childNodes[5].childNodes[1].textContent;
    let diagramItems = document.getElementsByClassName('diagram-item');
    let max = 0;
    Array.prototype.forEach.call(diagramItems, item => 
    {
        max = max < Number(GetVal(item)) ? Number(GetVal(item)) : max;
    })
    Array.prototype.forEach.call(diagramItems, item => 
    {
        item.style.height = `calc(100%*${GetVal(item)/max})`
    })
    
}

function AddToDiagram(id, key, value, color)
{
    var template = document.getElementsByTagName("template")[1];
    var clon = template.content.cloneNode(true);

    clon.getElementById('key').innerHTML = key;
    clon.getElementById('value').innerHTML = value;
    clon.getElementById('id_input').value = id;
    clon.getElementById('diagram_item').style.backgroundColor = color;

    document.getElementById('diagram').appendChild(clon);
    DiagramUpdate();
}

function RemoveFromDiagram(id)
{
    let diagramItems = document.getElementsByClassName('diagram-item');
    Array.prototype.forEach.call(diagramItems, item => 
    {
        
        if(item.childNodes[1].childNodes[3].value === id)
        {
            item.remove();
            DiagramUpdate();
            return;
        }
    })
}