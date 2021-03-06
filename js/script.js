var finish = document.getElementById('success'), url = document.getElementById('url'),
    form = document.getElementById('form'), subtitle = document.getElementById('subtitle'), what;

function show(par) {
    document.getElementById('fields').style.display = 'inline';
    document.getElementById('choose').style.display = 'none';
    subtitle.innerHTML = '<a href="javascript:back()">Torna Indietro</a>';
    what = par;
    switch (par) {
        case 'send':
            document.getElementById('text').setAttribute("placeholder", "Note");
            break;

        case 'ask':
            url.style.display = 'none';
            url.required = false;
            document.getElementById('default').textContent = 'Tipo di richiesta';
            break;
    }

}

function go() {
    var data = new FormData(form);
    data.append("what", what);
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

function back() {
    document.getElementById('fields').style.display = 'none';
    document.getElementById('choose').style.display = 'inline';
    url.style.display = 'inline';
    url.required = true;
    document.getElementById('text').setAttribute("placeholder", "Richiesta");
    finish.textContent = '';
    form.reset();
    subtitle.textContent = 'Scegli un\'opzione:';
    document.getElementById('default').textContent = 'Tipo di segnalazione';
}

document.getElementById('send').addEventListener('click', function () {
    show('send')
});
document.getElementById('ask').addEventListener('click', function () {
    show('ask')
});
form.addEventListener('submit', go);