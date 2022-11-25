<?php
$entry_id = ctype_digit($_GET['id']) ? $_GET['id'] : 0;
$url = 'https://bibid-api.tokyo/getgraph/'.$entry_id.'/';
$json = file_get_contents($url);
//echo $json;
$data = json_decode($json);
echo "ogp対応ページ。ツイート直後でここに来た場合は<a href=https://bibid-ai.com/#/showimages/".$data->id.">こちらへ。</a>";
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

createHead($data);

function createHead($data) {
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Bibid-ai</title>
    <!-- Google / Search Engine Tags -->
    <meta itemprop="name" content="<?php echo "bibid-ogptest"; ?>">
    <meta itemprop="description" content="<?php echo  "Bibid<ビビット>は、AI生成画像を共有できるサイトです。タグや呪文などで検索できます。"; ?>">
    <meta itemprop="image" content="<?php echo $data->image; ?>">
    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https:bibid-ai.com">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php echo $data->title ?>">
    <meta property="og:description" content="<?php echo  "Bibid<ビビット>は、AI生成画像を共有できるサイトです。タグや呪文などで検索できます。"; ?>">
    <meta property="og:image" content="<?php echo $data->image; ?>">
    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo $data->title ?>">
    <meta name="twitter:description" content="<?php echo "Bibid<ビビット>は、AI生成画像を共有できるサイトです。タグや呪文などで検索できます。"; ?>">
    <meta name="twitter:image" content="<?php echo $data->image;?>">
</head>

</html>

<?php
}
?>