let mobile = innerWidth < 720
const closeTag = document.createElement('SPAN')
closeTag.innerText = 'X'
closeTag.id = 'close-tag'

homeScreen(mobile)
closeTag.addEventListener('click',() => {
	mobile = innerWidth < 720 
	homeScreen(mobile)
})
window.addEventListener("resize",() => {
	mobile = innerWidth < 720 
	homeScreen(mobile)
})



function homeScreen(isMobile){
	let wrapper = document.getElementById("wrapper")
	wrapper.innerHTML = ""
	let width = wrapper.offsetWidth
	let height = wrapper.offsetHeight
	if(document.getElementById("closeTag")){
	 	wrapper.removeChild(closeTag)
	}
	
	//SVG

	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg')		
	svg.setAttribute("width", width)
	svg.setAttribute("height", height)

	//HTML Card

	let html = new Card(
		"html",
		isMobile ? [[0,0],[0,height * 1/2],[width,0],[width,0]] : [[0,0],[0,height],[0,height],[width * 1/2,0]],
		"img/html.svg",
		isMobile ? width * 1/3 : width * 1/4,
		isMobile ? height * 1/3 : height * 1/2,
		width * 1/6 - (width * (isMobile ? 1/3 : 1/4))/2,
		height * 1/6 - (height * (isMobile ? 1/3 : 1/3))/2
		)


	//CSS Card

	let css = new Card(
		"css",
		isMobile ? [[0,height * 1/2],[width,0],[width,height * 1/2],[0,height]] : [[width * 1/2,0],[0,height],[width * 1/2,height],[width,0]],
		"img/css.svg",
		isMobile ? width * 1/3 : width * 1/4,
		isMobile ? height * 1/3 : height * 1/2,
		width * 1/2 - (width * (isMobile ? 1/3 : 1/4))/2,
		height * 1/2 - (height * (isMobile ? 1/3 : 1/2))/2
		)

	//JS Card

	let js = new Card(
		"js",
		isMobile ? [[0,height],[0,height],[width,height * 1/2],[width,height]] : [[width,0],[width,0],[width * 1/2,height],[width,height]],
		"img/js.svg",
		isMobile ? width * 1/3 : width * 1/4,
		isMobile ? height * 1/3 : height * 1/2,
		width * 5/6 - (width * (isMobile ? 1/3 : 1/4))/2,
		height * 5/6 - (height * (isMobile ? 1/3 : 7/10))/2
		)

	//Styles
	html.group.setAttribute("fill-opacity",0.6)
	css.group.setAttribute("fill-opacity",0.6)
	js.group.setAttribute("fill-opacity",0.6)

	//DOM Insertion

	svg.appendChild(html.group)
	svg.appendChild(css.group)
	svg.appendChild(js.group)

	wrapper.appendChild(svg)

	//Event Handling

	addListeners()

	function addListeners(){

		if(!isMobile){
			html.img.addEventListener('mouseover',htmlGrow)
			html.img.addEventListener('mouseout',htmlShrink)
		}
		isMobile ?  html.group.addEventListener('click',htmlExpand) : html.img.addEventListener('click',htmlExpand)

		if(!isMobile){
			css.img.addEventListener('mouseover',cssGrow)
			css.img.addEventListener('mouseout',cssShrink)
		}
		isMobile ? css.group.addEventListener('click',cssExpand) : css.img.addEventListener('click',cssExpand)	

		if(!isMobile){
			js.img.addEventListener('mouseover',jsGrow)
			js.img.addEventListener('mouseout',jsShrink)
		}
		isMobile ? js.group.addEventListener('click',jsExpand) : js.img.addEventListener('click',jsExpand)
	}

	

	function removeListeners(){
		if(!isMobile){
			html.img.removeEventListener('mouseover',htmlGrow)
			html.img.removeEventListener('mouseout',htmlShrink)
		}
		isMobile ? html.group.removeEventListener('click',htmlExpand) : html.img.removeEventListener('click',htmlExpand)

		if (!isMobile){
			css.img.removeEventListener('mouseover',cssGrow)
			css.img.removeEventListener('mouseout',cssShrink)
		}
		isMobile ? css.group.removeEventListener('click',cssExpand) : css.img.removeEventListener('click',cssExpand)	

		if(!isMobile){
			js.img.removeEventListener('mouseover',jsGrow)
			js.img.removeEventListener('mouseout',jsShrink)
		}
		isMobile ? js.group.removeEventListener('click',jsExpand) : js.img.removeEventListener('click',jsExpand)
	}

	function htmlGrow(){
		clearInterval(interval)
		html.group.setAttribute("fill-opacity",1)
		html.reset()
		css.reset()
		js.reset()
		removeListeners()
		html.resize(
			"grow",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/2,
			(isMobile ? height : width) * 2/3,
			isMobile ? {1:{1:{fraction: 1/2,counter: 1}}, 2:{1:{fraction: 0,counter: 1}}} : {2:{0:{fraction: 0,counter: 1}}, 3:{0:{fraction: 1/2,counter: 1}}},
			'left-top')
		addListeners()
	}

	function htmlShrink(){
		clearInterval(interval)
		html.group.setAttribute("fill-opacity",0.6)
		removeListeners()
		html.resize(
			"shrink",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/2,
			(isMobile ? height : width) * 2/3,
			isMobile ? {1:{1:{fraction: 2/3,counter: -1}}, 2:{1:{fraction: 1/6,counter: -1}}} : {2:{0:{fraction: 1/6,counter: -1}}, 3:{0:{fraction: 2/3,counter: -1}}},
			"left-top")
		addListeners()
	}
	
	function htmlExpand(){
		clearInterval(interval)
		html.group.setAttribute("fill-opacity",0.6)
		css.group.setAttribute("display","none")
		js.group.setAttribute("display","none")
		removeListeners()
		html.resize(
			'expand',
			svg,
			isMobile ? height: width,
			5,
			(isMobile ? height : width) * 1/6,
			(isMobile ? height : width),
			isMobile ? {1:{1:{fraction: 2/3,counter: 1}}, 2:{1:{fraction: 1/6,counter: 1}}} : {2:{0:{fraction: 1/6,counter: 1}}, 3:{0:{fraction: 2/3,counter: 1}}},
			"none")
		wrapper.appendChild(closeTag)
	}

	function cssGrow(){
		clearInterval(interval)
		css.group.setAttribute("fill-opacity",1)
		html.reset()
		css.reset()
		js.reset()
		removeListeners()
		css.resize(
			"grow",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/2,
			(isMobile ? height : width) * 2/3,
			isMobile ? {0:{1:{fraction: 1/2,counter: -1}}, 2:{1:{fraction: 1/2,counter: 1}}} : {0:{0:{fraction: 1/2,counter: -1}}, 2:{0:{fraction: 1/2,counter: 1}}},
			'center')
		addListeners()
	}	

	function cssShrink(){
		clearInterval(interval)
		css.group.setAttribute("fill-opacity",0.6)
		removeListeners()
		css.resize(
			"shrink",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/3,
			(isMobile ? height : width) *  1/2,
			isMobile ? {0:{1:{fraction: 1/3,counter: 1}}, 2:{1:{fraction: 4/6,counter: -1}}} : {0:{0:{fraction: 1/3,counter: 1}}, 2:{0:{fraction: 2/3,counter: -1}}},
			'center')
		addListeners()
	}

	function cssExpand(){
		clearInterval(interval)
		css.group.setAttribute("fill-opacity",0.6)
		html.group.setAttribute("display","none")
		js.group.setAttribute("display","none")
		removeListeners()
		css.resize(
			"expand",
			svg,
			isMobile ? height: width,
			5,
			(isMobile ? height : width) * 4/6,
			(isMobile ? height : width) - 2,
			isMobile ? {0:{1:{fraction: 1/3,counter: -1}}, 2:{1:{fraction: 4/6,counter: 1}}} : {0:{0:{fraction: 1/3,counter: -1}}, 2:{0:{fraction: 4/6,counter: 1}}},
			"none")
		wrapper.appendChild(closeTag)
	}

	function jsGrow(){
		clearInterval(interval)
		js.group.setAttribute("fill-opacity",1)
		html.reset()
		css.reset()
		js.reset()
		js.resize(
			"grow",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/3,
			(isMobile ? height : width) * 1/2,
			isMobile ? {1:{1:{fraction: 1,counter: -1}}, 2:{1:{fraction: 1/2,counter: -1}}} : {1:{0:{fraction: 1,counter: -1}}, 2:{0:{fraction: 1/2,counter: -1}}},
			'right-bottom')
	}

	function jsShrink(){
		clearInterval(interval)
		js.group.setAttribute("fill-opacity",0.6)
		js.resize(
			'shrink',
			svg,
			isMobile ? height : width,
			2,
			(isMobile ? height : width) * 1/3,
			(isMobile ? height : width) *  1/2,
			isMobile ? {1:{1:{fraction: 5/6,counter: 1}}, 2:{1:{fraction: 1/3,counter: 1}}} : {1:{0:{fraction: 5/6,counter: 1}}, 2:{0:{fraction: 1/3,counter: 1}}},
			'right-bottom')
	}

	function jsExpand(){
		clearInterval(interval)
		js.group.setAttribute("fill-opacity",0.6)
		html.group.setAttribute("display","none")
		css.group.setAttribute("display","none")
		removeListeners()
		js.resize(
			'expand',
			svg,
			isMobile ? height : width,
			5,
			0,
			(isMobile ? height : width) * 5/6,
			isMobile ? {1:{1:{fraction: 5/6,counter: -1}}, 2:{1:{fraction: 1/3,counter: -1}}} : {1:{0:{fraction: 5/6,counter: -1}}, 2:{0:{fraction: 1/3,counter: -1}}},
			"none")
		wrapper.appendChild(closeTag)
	}

}