let interval

class Card{
	constructor(type,points,imgHref,imgWidth,imgHeight,imgX,imgY){
		this.group = document.createElementNS('http://www.w3.org/2000/svg','g')
		this.group.classList.add("group")
		this.group.id = type

		this.polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon')
		this.polygon.setAttribute("points",Card.pointsToString(points))
		this.polygon.classList.add("polygon")

		this.img = document.createElementNS('http://www.w3.org/2000/svg','image')
		this.img.setAttribute("href",imgHref)
		this.img.setAttribute("width", imgWidth)
		this.img.setAttribute("height", imgHeight)
		this.img.setAttribute("x", imgX)
		this.img.setAttribute("y", imgY)

		this.group.appendChild(this.polygon)
		this.group.appendChild(this.img)

		this.reset = (item = 'all') => {
			if(item == 'all'){
				this.polygon.setAttribute("points",Card.pointsToString(points))
				this.img.setAttribute("width", imgWidth)
				this.img.setAttribute("height", imgHeight)
				this.img.setAttribute("x", imgX)
				this.img.setAttribute("y", imgY)
			} else if(item == 'img'){
				this.img.setAttribute("width", imgWidth)
				this.img.setAttribute("height", imgHeight)
				this.img.setAttribute("x", imgX)
				this.img.setAttribute("y", imgY)
			} else if('polygon'){
				this.polygon.setAttribute("points",Card.pointsToString(points))
			}
			
		}

		this.originalValues = () => {
			return {
				type: type,
				points: points,
				imgHref: imgHref,
				imgWidth: imgWidth,
				imgHeight: imgHeight,
				imgX: imgX,
				imgY: imgY
			}
		}
	}

	resize(type,parent,parentSize,step,condition1,condition2,pivots,transformOrigin){

		if(type == "grow" || type == "expand"){
			parent.removeChild(this.group)
			parent.appendChild(this.group)
		}
		
		let counter = 0
		let polygon = this.polygon
		let img = this.img
		let originals = this.originalValues
		interval = setInterval(frame,5)	

		function frame(){
			if(condition1 + counter <= condition2){
				counter+= step

				let array = Card.pointsToArray(polygon.getAttribute("points"))

				for(const pivot in pivots){
					for(const point in pivots[pivot]){
						array[+pivot][+point] = parentSize * pivots[pivot][point]["fraction"] + counter * pivots[pivot][point]["counter"]
					}
				}

				polygon.setAttribute("points", Card.pointsToString(array))

				if(type == "grow" || type == "shrink"){

					if(counter < 150 && +(img.getAttribute("width")) >= originals().imgWidth * (type == "shrink" ? 1 : -1) && +(img.getAttribute("height")) >= originals().imgHeight * (type == "shrink" ? 1 : -1)){
						img.setAttribute("width", +(img.getAttribute("width")) + (type == "shrink" ? -1 : 1) * counter * 0.02)
						img.setAttribute("height", +(img.getAttribute("height")) +  (type == "shrink" ? -1 : 1) * counter * 0.02)
						if(transformOrigin == 'center'){
							img.setAttribute("x", +(img.getAttribute("x")) + (type == "shrink" ? 1 : -1) * counter * 0.02 / 2)
							img.setAttribute("y", +(img.getAttribute("y")) + (type == "shrink" ? 1 : -1) * counter * 0.02 / 2)
						}else if( transformOrigin == 'right-bottom'){
							img.setAttribute("x", +(img.getAttribute("x")) + (type == "shrink" ? 1 : -1) * counter * 0.02)
							img.setAttribute("y", +(img.getAttribute("y")) + (type == "shrink" ? 1 : -1) * counter * 0.02)
						}
						
					}
				}
			}else{
				clearInterval(interval)
			}
		}
	}

	static pointsToString(points){
		return points.map(e => e.join(",")).join(" ")
	}

	static pointsToArray(points){
		return points.split(" ").map(e => e.split(",").map(e => +(e)))
	}
}


