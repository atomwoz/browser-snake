function $random(min, max) {
    return Math.random() * (max - min) + min;
}


function $id(id)
{
    return document.getElementById(id)
}

function $c(c)
{
    return document.getElementsByClassName(c);
}

function $e(e)
{
    return document.getElementsByTagName(e);
}

function $mk(elem, className="")
{
    let x = document.createElement(elem);
    if(className != "")
    {
        x.className = className
    }
    return x
}
