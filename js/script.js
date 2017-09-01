var finish = document.getElementById('success');
var url = document.getElementById('url');
var what,label;

function show(par) {
    document.getElementById('fields').style.display = 'inline';
    document.getElementById('choose').style.display = 'none';
    document.getElementById('subtitle').innerHTML = '<a href="">Torna Indietro</a>';
    what = par;
    switch (par) {
        case 'send':
            document.getElementById('text').setAttribute("placeholder", "Note");
            break;

        case 'ask':
            url.style.display = 'none';
            url.required = false;
            break;
    }

}

function go() {
    var data = new FormData(document.getElementById('form'));
    data.append("what", what);
    switch (window.location.hash) {
        case 'emergenza':
            label = 'emergenza';
            break;

        case 'ricostruzione':
            label = 'ricostruzione';
            break;
        case 'sviluppo':
            label = 'ricostruzione';
            break;
        case 'finanza':
            label = 'ricostruzione';
            break;
    }
    data.append("label", label);
    var request = new XMLHttpRequest();
    request.open('POST', 'php/script.php', true);
    request.onload = function () {
        if (request.status === 200) {
            finish.textContent = 'Dati inviati!';
        } else {
            finish.textContent = 'C\'è stato un\'errore, riprova più tardi!';
        }
    };
    request.send(data);
}

document.getElementById('send').addEventListener('click', function () {
    show('send')
});
document.getElementById('ask').addEventListener('click', function () {
    show('ask')
});
document.getElementById('form').addEventListener('submit', go);