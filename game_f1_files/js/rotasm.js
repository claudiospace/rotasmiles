	var pageURL = window.location.href
	var encodedURL = encodeURIComponent(pageURL)
	var spaces = new Array()
	var instructions = new Array()
	var decks = new Array()
	var cards1 = new Array()
	var cards2 = new Array()
	var materials = new Array()
	var die0 = new Array()
	var die1 = new Array()
	var die2 = new Array()
	var dice = new Array()
	var font = "NunitoRegular"
	var zIndex = 0
    var dragged = false
	var docTitle = "Rota Smiles - Fase 1"
	var pageTitle = "Rota Smiles - Fase 1"
	var encodedDocTitle = encodeURIComponent(docTitle)
	var loadError = true
	var score={value:0}

	function loadSSContent(json) {

		sheetTitle = json.feed.title.$t
		
		docTitle = "Rota Smiles: " + sheetTitle
		pageTitle = sheetTitle
			

		startImg = json.feed.entry[0].gsx$appearance.$t.trim()
		endImg = json.feed.entry[46].gsx$appearance.$t.trim()
		nameImg = json.feed.entry[47].gsx$appearance.$t.trim()

		for (var i=1; i<=45; i++) {
			var space = json.feed.entry[i].gsx$appearance.$t.trim()
			var instruct = json.feed.entry[i].gsx$instruction.$t.trim()
			if (space != "X") {
				spaces[i-1] = space
				instructions[i-1] = instruct
				}
			else {
				break
				}
			}

		loadError = false
		
		}

	function loadCards(json) {		
		for (var i=0; i<json.feed.entry.length; i++) {
			cards1[i] = [json.feed.entry[i].gsx$card.$t.trim(),json.feed.entry[i].gsx$answer.$t.trim()]
			}
		}

	function loadCards2(json) {		
		for (var i=0; i<json.feed.entry.length; i++) {
			cards2[i] = [json.feed.entry[i].gsx$card.$t.trim(),json.feed.entry[i].gsx$answer.$t.trim()]
			}
		}

	var cards = [cards1,cards2]

	var preLoads = new Array()
	var pl = 0

	function preLoad(img) {
		preLoads[pl] = new Image()
		preLoads[pl].src = img
		pl++
		}

	function loadMaterials(json) {

		var j = 0
		for (var i=0; i<8; i++) {
			var p = json.feed.entry[i].gsx$url.$t.trim()
			if (p != "") {
				materials[j] = p
				j++
				}
			}
		j = 0
		for (var i=8; i<14; i++) {
			var p = json.feed.entry[i].gsx$url.$t.trim()
			if (p != "") {
				die0[j] = p
				preLoad(p)
				j++
				}
			}
		j = 0
		for (var i=14; i<20; i++) {
			var p = json.feed.entry[i].gsx$url.$t.trim()
			if (p != "") {
				die1[j] = p
				j++
				}
			}
		j = 0
		for (var i=20; i<26; i++) {
			var p = json.feed.entry[i].gsx$url.$t.trim()
			if (p != "") {
				die2[j] = p
				j++
				}
			}
		decks[0] = [json.feed.entry[26].gsx$url.$t.trim(),json.feed.entry[27].gsx$url.$t.trim()] // color, symbol
		decks[1] = [json.feed.entry[28].gsx$url.$t.trim(),json.feed.entry[29].gsx$url.$t.trim()] // color, symbol
		
		instructLink = json.feed.entry[30].gsx$url.$t.trim()
		font = json.feed.entry[31].gsx$url.$t

		}

	function loadBoard() {
		if (cards[0].length > 0) {
			shuffleCards(0)
			document.getElementById("deck").style.backgroundColor = decks[0][0]
			document.getElementById("deck").style.boxShadow = "1px 1px " + decks[0][0]
			document.getElementById("deckBack").src = decks[0][1]
			document.getElementById("deck").style.display = "inline-block"
			}
		if (cards[1].length > 0) {
			shuffleCards(1)
			document.getElementById("deck2").style.backgroundColor = decks[1][0]
			document.getElementById("deck2").style.boxShadow = "1px 1px " + decks[1][0]
			document.getElementById("deckBack2").src = decks[1][1]
			document.getElementById("deck2").style.display = "inline-block"
			}

		shuffleCards(1)
		
		var cName = "s" // small configuration
		var end = 20
		var config = [1,0,20,19,2,18,3,17,4,16,5,15,6,14,7,8,9,10,11,12,13]
		var mar = 10
		
		var total = spaces.length
		
		if (total == 45) {
			cName = "l" // large configuration
			end = 44
			config = [4,3,2,1,0,44,43,42,41,40,5,39,6,7,8,9,35,36,37,38,10,34,14,13,12,11,33,32,31,30,15,29,16,17,18,19,20,21,22,23,24,25,26,27,28]
			mar = -75
			}
		else if (total >= 33) {
			cName = "m" // medium configuration
			end = 32
			config = [4,3,2,1,0,32,31,30,29,28,5,27,6,26,7,25,8,24,9,23,10,11,12,13,14,15,16,17,18,19,20,21,22]
			mar = -75
			}
		
		var space = document.getElementsByClassName(cName)
		var spaceNum = document.getElementsByClassName(cName + 'n')
		for (var i=0; i<=end; i++) {
			var num = config[i]
			space[i].style.backgroundImage = prepSpace(spaces[num])
			space[i].classList.add("space")
			spaceNum[i].classList.add("num")
			spaceNum[i].innerHTML = num + 1
			if (instructions[num] != "") {
				space[i].innerHTML += "<DIV class='instructButton'><IMG SRC='./game_f1_files/img/Button-Info.png' height='30' width='30' Title='Clique para ver instruções' onClick='showInstruction(" + num + ")'></DIV>"
				}
			}
		document.getElementById('diceBox').style.marginLeft = mar + "px"

		}

	var picFormats = new Array(".gif",".png",".jpg",".jpeg",".webp")
	var otherFormats = new Array("https://docs.google.com/drawings")
	
	function prepSpace(spc) {
		if (spc == "") [ spc = "#999"]
		var space = "none" + spc + ")"
		for (j=0;j<picFormats.length;j++) {
			if (spc.slice(0,4) == "http" && spc.toLowerCase().slice(-1*picFormats[j].length) == picFormats[j]) {
				space = "url('" + spc + "')"
				}
			}
		for (j=0;j<otherFormats.length;j++) {
			if (spc.slice(0,otherFormats[j].length) == otherFormats[j]) {
				space = "url('" + spc + "')"
				}
			}
		return space
		}

	function prepSide(sd) {
		var side = "linear-gradient(to bottom right," + sd + "," + sd + ")"
		for (j=0;j<picFormats.length;j++) {
			if (sd.slice(0,4) == "http" && sd.toLowerCase().slice(-1*picFormats[j].length) == picFormats[j]) {
				side = "url('" + sd + "')"
				}
			}
		for (j=0;j<otherFormats.length;j++) {
			if (sd.slice(0,otherFormats[j].length) == otherFormats[j]) {
				side = "url('" + sd + "')"
				}
			}
		return side
		}

	function prepText(txt) {
		if (txt.toLowerCase().indexOf("[[image:") > -1) {
			txt = txt.replace(/\[\[Image:/i,"<IMG class='pic' align='center' SRC='")
			txt = txt.replace("]]","'>")
			if (txt.indexOf("https://equatio-api") > -1) {
				txt = txt.replace("'pic'","'equatio pic'")
				}
			}
        else if (txt.indexOf("docs.google.com/") > -1) {
			txt = txt.replace("[[","<iframe class='googleDoc' src='")
			txt = txt.replace("pub?","embed?")
			txt = txt.replace("]]","' allowfullscreen='true' mozallowfullscreen='true' webkitallowfullscreen='true'></iframe>")
			}
		else if (txt.toLowerCase().indexOf("[[link:") > -1) {
            var url = txt.match(/\[\[Link:(.*?)\]\]/i)[1]
			txt = txt.replace(/\[\[Link:/i,"")
			txt = txt.replace("]]","")
			txt = txt.replace(url,"<BR><A class='link' HREF='" + url + "' TARGET='_blank'>" + url + "</A><BR>")
			}
		else if (txt.indexOf("youtu.be") > -1) {
			txt = txt.replace("[[https://youtu.be/","<iframe class='vid' src='//www.youtube.com/embed/")
			txt = txt.replace("]]","?rel=0&amp;showinfo=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")
			}
		else if (txt.indexOf("https://voca.ro/") > -1) { // New Vocaroo
			txt = txt.replace("[[https://voca.ro/","<iframe class='voc' src='https://vocaroo.com/embed/")
			txt = txt.replace("]]","' frameborder='0'></iframe>")
			}
		else if (txt.toLowerCase().indexOf(".mp3]]") > -1 || txt.toLowerCase().indexOf(".ogg]]") > -1) {
			txt = txt.replace("[[","<audio controls class='mp3'><source src='")
			txt = txt.replace("]]","' type='audio/mpeg'></audio>")
			}
		else if (txt.indexOf("desmos.com/calculator/") > -1) {
			txt = txt.replace("[[","<iframe class='desmos' src='")
			txt = txt.replace("]]","?embed' frameborder=0></iframe>")
			}
		return txt
		}

	function showInstruction(nm) {
		closeCard()
		document.getElementById('cardHead').style.backgroundColor = "#eee"
		document.getElementById('cardHeadImg').src = "./game_f1_files/img/Button-Info.png"
		document.getElementById('cardText').innerHTML = prepText(instructions[nm])
		document.getElementById('checkButton').style.display = "none"
		document.getElementById('cardAnswer').style.display = "none"
		document.getElementById('card').style.display = "block"
		}

	function shuffleCards(nm) {
		var i = cards[nm].length
		if ( i == 0 ) return false
		while ( --i ) {
			var j = Math.floor( Math.random() * ( i + 1 ) )
			var tempCardsi = cards[nm][i]
			var tempCardsj = cards[nm][j]
			cards[nm][i] = tempCardsj
			cards[nm][j] = tempCardsi
			}
		}

	var crd = [0,0]
	function drawCard(nm) {
		closeCard()
		playSound(flip)
		document.getElementById('cardHead').style.backgroundColor = decks[nm][0]
		document.getElementById('cardHeadImg').src = decks[nm][1]
		document.getElementById('cardText').innerHTML = prepText(cards[nm][crd[nm]][0])
		if (cards[nm][crd[nm]][1] != "") {
			document.getElementById('checkButton').style.display = "block"
			document.getElementById('cardAnswer').innerHTML = prepText(cards[nm][crd[nm]][1])
			}
		document.getElementById('card').style.display = "block"
		crd[nm]++
		if (crd[nm] == cards[nm].length) { 
			shuffleCards(nm)
			crd[nm] = 0 
			}
		}

	function showAnswer() {
		document.getElementById('cardAnswer').style.display = "block"
		}

	function closeCard() {
		document.getElementById('cardText').innerHTML = "" // change HTML to stop multimedia from playing
		document.getElementById('cardAnswer').innerHTML = "" // change HTML to stop multimedia from playing
		document.getElementById('checkButton').style.display = "none"
		document.getElementById('cardAnswer').style.display = "none"
		document.getElementById("card").style.display = "none"
		}

	function loadImages() {
		document.getElementById("start").innerHTML = "<IMG SRC='" + startImg + "' class='startEnd'>"
		document.getElementById("end").innerHTML = "<IMG SRC='" + endImg + "' class='startEnd'>"
		document.getElementById("name").innerHTML = "<IMG SRC='" + nameImg + "' class='name'>"
		if (die0.length == 6) {
			var d0 = document.getElementById("die0")
			d0.style.backgroundImage = prepSide(die0[0])
			d0.style.display = "inline-block"
			document.getElementById("roll").style.display = "inline"
			}
		if (die1.length == 6) {
			var d1 = document.getElementById("die1")
			d1.style.backgroundImage = prepSide(die1[0])
			d1.style.display = "inline-block"
			}
		if (die2.length == 6) {
			var d2 = document.getElementById("die2")
			d2.style.backgroundImage = prepSide(die2[0])
			d2.style.display = "inline-block"
			}
		dice = [die0,die1,die2]
		}

	function playSound(snd) {
		snd.pause()
		snd.currentTime = 0
		snd.play()
		}

	function rollDie(nm) {
		var d = document.getElementById("die" + nm)
		d.classList.remove("roll")
		void d.offsetWidth
		d.classList.add("roll")
		setTimeout(function(){ d.style.backgroundImage = prepSide(dice[nm][Math.floor(Math.random() * 6) ]) }, 100);
		setTimeout(function(){ d.style.backgroundImage = prepSide(dice[nm][Math.floor(Math.random() * 6) ]) }, 200);
		setTimeout(function(){ d.style.backgroundImage = prepSide(dice[nm][Math.floor(Math.random() * 6) ]) }, 300);
		}

	function rollAll() {
		playSound(roll)
		rollDie(0)
		if (die1.length > 0) { rollDie(1) }
		if (die2.length > 0) { rollDie(2) }
		}

	function loadTokens() {
		var tokens = ""
		for (var i=0; i<materials.length; i++) {
			tokens += "<img src='" + materials[i] + "' id='t" + i + "' class='token' draggable='false'>"
			}
		document.getElementById("tokens").innerHTML = tokens
		}
		
