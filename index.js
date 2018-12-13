const http = require('http')
const WebSocket = require('ws')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const localurl = './public' + req.url.replace(/\/$/, '/index.html')
  try {
    const data = fs.readFileSync(localurl, { encoding: 'utf-8' })
    res.end(data)
  } catch (e) {
    console.log(localurl)
    res.statusCode = 404
    res.end()
  }
})

const wss = new WebSocket.Server({server})

wss.on('connection', ws => {
  ws.on('message', message => {
    wss.clients.forEach(client => {
      if (client !== ws) {
        client.send(message)
      }
    })
  })
})

server.listen(8000)
