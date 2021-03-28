	
	var container = document.querySelector("#container");
    var activeItem = null;

    var active = false;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      if (e.target !== e.currentTarget && e.target.className.indexOf("token") >= 0 ) {
        active = true;
			//hideOptions()
          dragged = true
        // this is the item we are interacting with
        activeItem = e.target;
		zIndex++
		activeItem.style.zIndex = zIndex
        if (activeItem !== null) {
          if (!activeItem.xOffset) {
            activeItem.xOffset = 0;
          }

          if (!activeItem.yOffset) {
            activeItem.yOffset = 0;
          }

          if (e.type === "touchstart") {
            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
            activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
          } else {
            activeItem.initialX = e.clientX - activeItem.xOffset;
            activeItem.initialY = e.clientY - activeItem.yOffset;
          }
        }
      }
    }

    function dragEnd(e) {
      if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
      }

      active = false;
      activeItem = null;

    }

    function drag(e) {
      if (active) {
        if (e.type === "touchmove") {
          e.preventDefault();

          activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
          activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
          activeItem.currentX = e.clientX - activeItem.initialX;
          activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
   }

	window.onbeforeunload = function() {
		return "Changes you made may not be saved.";
		};

	var roll = new Audio("./game_f1_files/audio/Dice.mp3")
	var flip = new Audio("./game_f1_files/audio/CardFlip.mp3")
	

        document.getElementById('linkURL').value = window.location.href
		document.title = docTitle
		document.getElementById('title').innerHTML = pageTitle
		loadBoard()
		loadImages()
		loadTokens()
		document.getElementById("cardContent").style.fontFamily = font
		if ("1a5dqPTlnn4qo9aNPPnf1JRpfBYM9lu5rcqeZhUhwkPE" == "1CAspoWCY_fLBe6P7bWZiI8OrDqK9Zlmh4P_yArb0Q-s") { document.getElementById('instructions').style.display = "table-row" }
   