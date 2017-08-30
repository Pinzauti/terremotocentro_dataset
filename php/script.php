<?php
require_once "spyc.php";
require_once "curl.php";

class elements
{
    public $what;
    public $name;
    public $email;
    public $text;
    public $url;
    public $label = "Segnalo un dataset";
    public $list = [];

    function __construct()
    {
        $this->what = htmlspecialchars(trim($_POST["what"]));
        $this->name = htmlspecialchars(trim($_POST["name"]));
        $this->email = htmlspecialchars(trim($_POST["email"]));
        $this->text = htmlspecialchars(trim($_POST["text"]));
        $this->url = isset($_POST["url"]) ? htmlspecialchars(trim($_POST["url"])) : NULL;
    }

    function error()
    {
        http_response_code(400);
    }

    function check()
    {
        if (empty($this->what) || empty($this->name) || empty($this->email) || empty($this->text)) {
            $this->error();
            exit;
        }
    }
}

$data = new elements;

$data->check();

$data->list = array(
    'Nome' => $data->name,
    'E-mail' => $data->email,
    'Testo' => $data->text,
);

switch ($data->what) {
    case "send":
        $data->list["URL"] = $data->url;
        break;
    case "ask":
        $data->label = "Cerco un dataset";
        break;
    default:
        $data->error();
        break;
}

$yaml = Spyc::YAMLDump($data->list);

$things = array(
    "title" => substr($data->text, 0, 10),
    "body" => "<pre><yamldata>$yaml</yamldata></pre>",
    "labels" => [$data->label]
);

$issue = new curl;
$issue->createIssue($things, "https://api.github.com/repos/emergenzeHack/terremotocentro_segnalazioni/issues", "INSERISCI USERNAME", "INSERISCI PASSWORD");
$issue->isFinished();