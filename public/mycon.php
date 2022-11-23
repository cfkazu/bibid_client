<?php

echo "ogp対応ページ。ツイート直後でここに来た場合は<a href=https://bibid-ai.com/#/contest/>こちらへ。</a>";
/*
$entry_id = ctype_digit($_GET['id']) ? $_GET['id'] : 0;
$ctrl = new dataController(); //この辺は省略

//個別に出力したい項目について定義
$data = [
            "title"        => "def_title",
            "main_caption" => "def_caption",
            "main_img"     => "def_img"
        ];
$data = $ctrl->getEntry($entry_id);
if ( count($data) <= 0 ){
    //entry_idに対応したデータが無かったらトップへ
    header('Location: http://onigiri-tabetai.jp/');
    exit());
}*/

createHead();

function createHead() {
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Bibid-ai</title>
    <!-- Google / Search Engine Tags -->
    <meta itemprop="name" content="<?php echo "https:bibid-ai.com"; ?>">
    <meta itemprop="description" content="<?php echo  "Bibid<ビビット>は、AI生成画像を共有できるサイトです。Amazonギフト券がもらえるコンテスト開催中！"; ?>">
    <meta itemprop="image" content="<?php echo "https://bibid-ai.com/static/mycon.png"; ?>">
    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https:bibid-ai.com">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php echo "あなたはどっち派？投稿しよう！"; ?>">
    <meta property="og:description" content="<?php echo  "Bibid<ビビット>は、AI生成画像を共有できるサイトです。Amazonギフト券がもらえるコンテスト開催中！"; ?>">
    <meta property="og:image" content="https://bibid-ai.com/static/mycon.png">
    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo "あなたはどっち派？投稿しよう！"; ?>">
    <meta name="twitter:description" content="<?php echo "Bibid<ビビット>は、AI生成画像を共有できるサイトです。Amazonギフト券がもらえるコンテスト開催中！"; ?>">
    <meta name="twitter:image" content="https://bibid-ai.com/static/mycon.png">
</head>

</html>

<?php
}
?>