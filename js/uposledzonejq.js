function $random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function $s(s)
{
    return document.querySelector(s);
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
