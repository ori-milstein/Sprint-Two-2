'use strict'

var positions

function renderMeme(isLineNew = false, isInit = false) {
    const gallery = document.querySelector('.gallery')
    const editor = document.querySelector('.editor')

    editor.classList.remove('hidden')
    gallery.classList.add('hidden')

    // resizeCanvas()
    const meme = getMeme()
    const img = new Image()
    img.src = `img/meme-imgs/meme-imgs-square/${meme.selectedImgId}.jpg`

    img.addEventListener("load", () => {
        // resizeCanvas()
        // gCtx.drawImage(img, 0, 0)
        // gElCanvas.width = img.width
        // gElCanvas.height = img.height
        coverCanvasWithImg(img)
        if (isInit) {
            positions = [{ x: gElCanvas.width / 2, y: 40 }, { x: gElCanvas.width / 2, y: gElCanvas.height - 40 }]
            positions.forEach((pos, idx) => updatePosition(pos, idx))
        }
        gCtx.font = `${meme.lines[0].size}px arial`
        gCtx.fillStyle = meme.lines[0].color
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'

        renderText(isLineNew)
        // renderRects()
        renderRect(meme.selectedLineIdx)
    })
}
function renderText(isLineNew = false) {
    const [firstLine, secondLine, ...rest] = getMeme().lines

    // gCtx.strokeStyle = getMeme().lines[0].color
    console.log('gCtx', gCtx)
    drawText(firstLine.txt, positions[0].x, positions[0].y)

    // drawRectAround(positions[0], 0)
    console.log('gCtx', gCtx)
    // gCtx.strokeStyle = getMeme().lines[1].color
    // gCtx.fillStyle = getMeme().lines[0].color
    drawText(secondLine.txt, positions[1].x, positions[1].y)
    // drawRectAround(positions[1], 1)

    rest.forEach((line, idx) => {
        // gCtx.strokeStyle = line.color
        drawText(line.txt, positions[idx + 2].x, positions[idx + 2].y)
        // drawRectAround(pos)
    })

    // drawRectAround(positions[0])

    if (isLineNew) onSwitchLine(getMeme().selectedLineIdx, isLineNew)
}

function renderRects() {
    getMeme().lines.forEach((line, idx) => {
        drawRectAround(positions[idx], idx)
    })
}

function renderRect(idx) {

    drawRectAround(positions[idx], idx)

}

function drawRectAround(pos, idx) {
    const textMetrics = gCtx.measureText(getMeme().lines[idx].txt)
    const width = textMetrics.width
    const realWidth = textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft
    const height = textMetrics.actualBoundingBoxAscent

    console.log(textMetrics)
    console.log(realWidth)
    // gCtx.beginPath()
    drawRect(pos.x - width / 2 - 10, pos.y - height - 10, width + 20, height * 2 + 20)
    // gCtx.closePath()
}

function onRectClick(ev) {
    // ?const { offsetX, offsetY, pageX, pagetY } = ev
    const { offsetX, offsetY, clientX, clientY } = ev
    // :TODO - find the hovered star

    const line = getMeme().lines.find(line => {
        var { x, y } = line.pos
        const textMetrics = gCtx.measureText(line.txt)
        const width = textMetrics.width
        const height = textMetrics.actualBoundingBoxAscent
        // <<<<<<< HEAD
        // const rectX = x - width / 2 - 10
        // const rectY = y - height - 10
        // =======
        // <<<<<<< HEAD
        // const rectX = x - width / 2 - 10
        // const rectY = y - height - 10
        // =======
        const rectX = line.pos.x - width / 2 - 10
        const rectY = line.pos.y - height - 10
        // >>>>>>> faa694be4a018bfc86a4d932920aa6a958d0ca6a
        // >>>>>>> e7ff6d0c329243ae73195b6bf287bce89565883f

        return (offsetX >= rectX && offsetX <= rectX + width + 20 &&
            offsetY >= rectY && offsetY <= rectY + height * 2 + 20)
    })

    // <<<<<<< HEAD
    if (line) onSwitchLine(getMeme().lines.indexOf(line))
    // =======
    // <<<<<<< HEAD
    if (line) onSwitchLine(getMeme().lines.indexOf(line))
    // =======
    onSwitchLine(getMeme().lines.indexOf(line))
    // >>>>>>> faa694be4a018bfc86a4d932920aa6a958d0ca6a
    // >>>>>>> e7ff6d0c329243ae73195b6bf287bce89565883f
}

function onChangeTxt(val) {
    // setLineTxt(document.querySelector('[name="firstLine"]').value)
    setLineTxt(val)
    renderMeme()
}

function onChangeColor(val) {
    setLineColor(val)
    renderMeme()
}

function onChangeFontSize(dir) {
    setFontSize(dir)
    renderMeme()
}

function onAddLine() {
    const isLineNew = true
    positions.push({ x: gElCanvas.width / 2, y: gElCanvas.height / 2 })
    addLine()
    updatePosition(positions[positions.length - 1], positions.length - 1)
    renderMeme(isLineNew)
}

function onSwitchLine(idx, isLineNew = false) {

    const newLineIdx = switchLine(idx)
    const elTxtInput = document.querySelector('input[type="text"]')
    const newLineTxt = getMeme().lines[newLineIdx].txt

    elTxtInput.value = newLineTxt
    // setLineTxt(lineIdx)
    if (isLineNew) return
    renderMeme()
}

function onDownload() {
    const dataUrl = gElCanvas.toDataURL()
    const elLink = document.querySelector('a.download')
    const firstLine = getMeme().lines[0].txt

    elLink.href = dataUrl
    elLink.download = `${firstLine}.png`
}