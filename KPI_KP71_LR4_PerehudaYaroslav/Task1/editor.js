let image;
let arrayOfAction = [];

function isAlpha(str)
{
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++)
    {
        code = str.charCodeAt(i);
        if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) return false;
    }
    return true;
};
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

function changePropertie(name, value)
{
    switch (name)
    {
        case 'height':
        {
            if(isNumeric(value))
            {
                arrayOfAction.push(() => {image.style.height = `${value}px`;});
                return true;
            }
            return false;
        }
        case 'width':
        {
            if(isNumeric(value))
            {
                arrayOfAction.push(() => {image.style.width = `${value}px`;});
                return true;
            }
            return false;
        }
        case 'border-width':
        {
            if(isNumeric(value))
            {
                arrayOfAction.push(() =>
                {
                    image.style.border = `${value}px`;
                    image.style.borderStyle = 'solid';
                });
                return true;
            }
            return false;
        }
        case 'border-color':
        {
            if(isAlpha(value))
            {
                arrayOfAction.push(() => {image.style.borderColor = value;});
                return true;
            }
            return false;
        }
        case 'alt':
        {
            if(isAlpha(value))
            {
                arrayOfAction.push(() => {image.title = value});
                return true;
            }
            return false;
        }
    }
}

function Edit(event)
{
    event.preventDefault();
    console.log('123');

    if(!image) image = document.getElementById('image');

    let arrayOfInput = document.getElementById('form').getElementsByClassName('input');
    let isValid = true;

    Array.prototype.forEach.call(arrayOfInput, propertie =>
    {
        console.log('name', propertie.name);
        console.log('value', propertie.value);
        let successful = changePropertie(propertie.name, propertie.value);
        propertie.style.border =  successful ? "1px solid gray" : "2px solid red"
        isValid = isValid && successful;
    });

    if(isValid)
    {
        arrayOfAction.forEach(action => action());
        arrayOfAction = [];
    }
}