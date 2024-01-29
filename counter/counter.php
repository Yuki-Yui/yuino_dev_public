<?php
$dataFile = $_SERVER['DOCUMENT_ROOT'] . '/counter/access_data.json';

// タイムゾーンを日本標準時に設定
date_default_timezone_set('Asia/Tokyo');

// JSON ファイルを読み込む
$accessData = json_decode(file_get_contents($dataFile), true);

// 現在の日付を取得
$currentDate = date('Y-m-d');
//echo $currentDate;

// 最新の日付を検索
$latestDate = isset($accessData['daily'][0]['day']) ? $accessData['daily'][0]['day'] : null;

// 最新の日付が今日または前日でない場合
if ($latestDate !== $currentDate) {
    // 最新の日付から今日までの日付に対して新しい項目を作成
    $current = $latestDate;
    while ($current < $currentDate) {
        $current = date('Y-m-d', strtotime($current . ' +1 day'));
        array_unshift($accessData['daily'], [
            'day' => $current,
            'count' => 0
        ]);
    }
}

// 今日の日付の 'count' に1を足す
if (isset($accessData['daily'][0]) && $accessData['daily'][0]['day'] === $currentDate) {
    // echo $accessData['daily'][0];
    if (isset($accessData['daily'][0]['count'])) {
        $accessData['daily'][0]['count']++;
    } else {
        $accessData['daily'][0]['count'] = 1;
    }
}

// allキーの値に1を足す
if (isset($accessData['all'])) {
    $accessData['all']++;
} else {
    $accessData['all'] = 1;
}

// JSON ファイルにデータを保存
file_put_contents($dataFile, json_encode($accessData, JSON_PRETTY_PRINT));

// JSON データを出力
//header('Content-Type: application/json');
//echo json_encode($accessData, JSON_PRETTY_PRINT);

?>