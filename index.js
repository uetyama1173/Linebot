const https = require("https")
const express = require("express")
const app = express()

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
    // ユーザーがボットにメッセージを送った場合、返信メッセージを送る
    console.log(req.body.events[0].type === "message")
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
                                    "data": "low"
                                }
                            },
                            {
                                "type": "button",
                                "style": "link",
                                "height": "sm",
                                "action": {
                                    "type": "postback",
                                    "label": "30~40代",
                                    "data": "middle"
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
                                    "data": "high"
                                }
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "postback",
                                    "label": "60代以上",
                                    "data": "age60"
                                }
                            }
                        ],
                        "flex": 0
                    }
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
        console.error(err)
    })

    // データを送信
    request.write(dataString)
    request.end()

})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})



