https://api.ciscospark.com/v1/webhooks

{
  "name": "dmytro",
  "targetUrl": "https://6bbab185.ngrok.io/ciscospark/receive",
  "resource": "all",
  "event": "all",
  "secret": "80333"
}

curl --header "Authorization: Bearer Y2JhNDg1NzYtMTlkOC00ZmFhLWJjM2ItOGVmZDlmZDJkOWNjNTNhNjhkY2YtMjAx_PF84_9ec3887b-cea5-4430-88ed-6b0a8e2d18e9" -d  "name=dmytro&targetUrl=https://6fd81507.ngrok.io/ciscospark/receive&resource=all&event=all&secret=80333" "https://api.ciscospark.com/v1/webhooks"