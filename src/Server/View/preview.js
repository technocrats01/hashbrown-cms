'use strict';

module.exports = function(_, view) { return `

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width initial-scale=1">
    <meta name="description" content="A free and open-source headless CMS">
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
     
    <link href="/favicon.png?v=2" rel="icon" type="image/png">
    <link href="/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/lib/normalize/normalize.css" rel="stylesheet">
    <link href="/css/client.css" rel="stylesheet">
    link(href='/css/preview.css', rel='stylesheet')

    <title>HashBrown CMS</title>
</head>

<body>
    <div class="preview-banner">Preview</div>

    <iframe src="${view.previewUrl}"></iframe>
</body>

`}
