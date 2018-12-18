/*
* @Author: xzhih
* @Date:   2018-06-22 20:52:48
* @Last Modified by:   xzhih
* @Last Modified time: 2018-12-18 18:32:49
*/

// 从 URL 获取图片
const getImg = imgURL => {
	fetch(imgURL)
	.then(response => response.blob())
	.then(blob => new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.onerror = reject
		reader.readAsDataURL(blob)
	}))
	.then(dataUrl => {
		document.getElementById('cover').style.backgroundImage = 'url(' + dataUrl + ')'
	})
	.then(() => makeImg())
}


// 图片上传
const uploadImg = e => {
	var img = e.files[0]
	var reader = new FileReader()
	reader.readAsDataURL(img)
	reader.onloadend = function() {
		document.getElementById('cover').src = reader.result
		makeImg()
	}
}

const getTilte = title => {
	document.getElementById('card-title').innerHTML = title
	makeImg()
}

const getContent = content => {
	document.getElementById('card-content').innerHTML = content
	makeImg()
}

// 生成二维码
const getQRcode = QRcode => {
	document.getElementById('qrcode').innerHTML = ''

	if (!QRcode) {
		document.getElementById('card-qrcode').style.display = 'none'
		makeImg()
		return
	}

	document.getElementById('card-qrcode').style.display = 'block'
	var qrcode = new QRCode(document.getElementById('qrcode'), {
		width: 54,
		height: 54,
		colorDark: '#3d4752',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.L
	})

	qrcode.makeCode(QRcode)
	makeImg()
}

// 生成图片
const makeImg = () => {
	html2canvas(document.querySelector('#card'), {
		allowTaint: true,
		taintTest: true,
		useCORS: true,
		scale: 3
	})
	.then(canvas => {
		document.querySelector('.down').setAttribute('href', canvas.toDataURL())
	})
}
