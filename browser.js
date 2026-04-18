function dirname(p) { return p.split('/').slice(0, -1).join('/') }

// https://github.com/denoland/std/blob/main/streams/concat_readable_streams.ts
function cat(streams) {
  let i = 0
  return new ReadableStream({
    async pull(c) {
      const r = streams[i].getReader()
      const { done, value } = await r.read()
      if (done) return streams.length == ++i ? c.close() : this.pull(c)
      c.enqueue(value)
      r.releaseLock()
    },
  })
}

async function dls(stream, name) {
  const blob = await new Response(stream).blob()
  const url = URL.createObjectURL(blob)
  Object.assign(document.createElement('a'), {
    href: url,
    download: name,
  }).click()
  URL.revokeObjectURL(url)
}

function parse_m3u8(data) {
  return data.split('\n').filter(s => s && !s.startsWith('#'))
}

// -------------------------------------------------------------

async function kd_stream(src) {
  const base = dirname(src) + '/'
  const index_m3u8 = await fetch(src).then(r => r.text())
  const bestvideo_url = base + parse_m3u8(index_m3u8).pop()
  const bestvideo_m3u8 = await fetch(bestvideo_url).then(r => r.text())
  const bestvideo_urls = parse_m3u8(bestvideo_m3u8).map(p => base + p)
  return Promise.all(bestvideo_urls.map(url => fetch(url).then(r => r.body))).then(cat)
}

function kd_meta() {
  const velem = document.getElementById('kdplayer_html5_api')
  return {
    src: velem.getElementsByTagName('source')[0].src,
    id: velem.getElementsByTagName('content-stats')[0].dataset.videoId,
    name: document.getElementsByClassName('title-main')[0].innerText,
  }
}

(async () => {
  const { src, id, name } = kd_meta()
  const stream = await kd_stream(src)
  dls(stream, `${name}[${id}].mp2t`)
})()
