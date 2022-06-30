const https = require("https")
const express = require("express")
const app = express()

//postgresqlを接続するコマンド
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        //.log(JSON.stringify(row));
    }
    client.end();
});
//ここまで

const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.sendStatus(200)
})


app.post("/webhook", function (req, res) {
    res.send("HTTP POST request sent to the webhook URL!")
    //ユーザーがボットにメッセージを送った場合、返信メッセージを送る
    console.log(req.body.events[0].type === "message")
    console.log(req.body.events[0])
    const age = req.body.events[0]
    console.log(age.postback)
    

    
    





    /*     if (postback.data = young) {
            console.log(req.body.events[0].type === "message2")
        } else if (postback.data = middle) {
            console.log(req.body.events[0].type === "message2")
        } else if (postback.data = high) {
            console.log(req.body.events[0].type === "message2")
        } else if (postback.data = aged) {
            console.log(req.body.events[0].type === "message2")
        } */


    // 文字列化したメッセージデータ
    const dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,

        messages: [
            {

                "type": "flex",
                "altText": "this is a flex message",
                "contents": {


                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "action": {
                            "type": "uri",
                            "uri": "http://linecorp.com/"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "年代を教えて下さい",
                                "weight": "bold",
                                "size": "xl",
                                "margin": "none",
                                "align": "center"
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "margin": "md",
                                "contents": []
                            }
                        ],
                        "borderColor": "#696969",
                        "cornerRadius": "30px"
                    },
                    "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "button",
                                "style": "link",
                                "height": "sm",
                                "action": {
                                    "type": "postback",
                                    "label": "10~20代",
                                    "data": "young",
                                    "displayText": "10~20代"
                                }
                            },
                            {
                                "type": "button",
                                "style": "link",
                                "height": "sm",
                                "action": {
                                    "type": "postback",
                                    "label": "30~40代",
                                    "data": "middle",
                                    "displayText": "30~40代"
                                }
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [],
                                "margin": "sm"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "postback",
                                    "label": "50~60代",
                                    "data": "high",
                                    "displayText": "50~60代"
                                }
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "postback",
                                    "label": "60代以上",
                                    "data": "aged",
                                    "displayText": "60代以上"
                                }
                            }
                        ],
                        "flex": 0
                    }
                }

            }





        ]
    })



    const dataString2 = JSON.stringify({
        replyToken: req.body.events[0].replyToken,

        messages2: [
            {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "http://linecorp.com/"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "何人で観光しますか？",
                            "weight": "bold",
                            "size": "xl",
                            "margin": "none",
                            "align": "center"
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "margin": "md",
                            "contents": []
                        }
                    ],
                    "borderColor": "#696969",
                    "cornerRadius": "30px"
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "postback",
                                "label": "1人",
                                "data": "solo",
                                "displayText": "1人"
                            }
                        },
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "postback",
                                "label": "2人",
                                "data": "duet",
                                "displayText": "2人"
                            }
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "margin": "sm"
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "postback",
                                "label": "3~5人",
                                "data": "trio",
                                "displayText": "3~5人"
                            }
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "postback",
                                "label": "5人以上",
                                "data": "quintet",
                                "displayText": "5人以上"
                            }
                        }
                    ],
                    "flex": 0
                }
            }
        ]


    })










    // リクエストヘッダー
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + TOKEN
    }

    // リクエストに渡すオプション
    const webhookOptions = {
        "hostname": "api.line.me",
        "path": "/v2/bot/message/reply",
        "method": "POST",
        "headers": headers,
        "body": dataString
    }

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => {
        res.on("data", (d) => {
            process.stdout.write(d)
        })
    })

    // エラーをハンドル
    request.on("error", (err) => {
        //.error(err)
    })

    // データを送信
    request.write(dataString)
    request.end()

})

app.listen(PORT, () => {
    //.log(`Example app listening at http://localhost:${PORT}`)
})



