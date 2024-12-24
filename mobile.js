let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  touchEndX = 0;
  touchEndY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(!this.rotating) {
        if (e.touches.length > 0) {
          this.touchMoveX = e.touches[0].clientX;
          this.touchMoveY = e.touches[0].clientY;
          
          this.velX = this.touchMoveX - this.prevTouchX;
          this.velY = this.touchMoveY - this.prevTouchY;
        }
      }
        
      const dirX = e.touches[0].clientX - this.touchStartX;
      const dirY = e.touches[0].clientY - this.touchStartY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevTouchX = this.touchMoveX;
        this.prevTouchY = this.touchMoveY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    })

    paper.addEventListener('touchstart', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // For two-finger rotation on touch screens
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});



function hideElementsByClassName(className) {
  const elements = document.getElementsByClassName(className);
  Array.from(elements).forEach((element) => {
    element.classList.add('hidden');
  });
}


function clickYes() {
  // Hide the current paper
  hideElementsByClassName('hide'); 

  // Dynamically create a new div
  const newDiv = document.createElement('div');
  newDiv.className = 'paper red';
  newDiv.innerHTML = `
    <p class="p1">আমি জানতাম তুমিও আমাকে ভালোবাসো</p>
    <p class="p2"></p>
  `;

  // Add mouse and touch event handling for dragging
  const startDrag = (e, targetDiv) => {
    console.log('Mouse down or touch start on div');
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

    const offsetX = clientX - targetDiv.getBoundingClientRect().left;
    const offsetY = clientY - targetDiv.getBoundingClientRect().top;

    const onMove = (moveEvent) => {
      targetDiv.style.position = 'absolute';
      const moveClientX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
      const moveClientY = moveEvent.type === 'mousemove' ? moveEvent.clientY : moveEvent.touches[0].clientY;

      targetDiv.style.left = `${moveClientX - offsetX}px`;
      targetDiv.style.top = `${moveClientY - offsetY}px`;
    };

    const endDrag = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', endDrag);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', endDrag);
  };

  newDiv.addEventListener('mousedown', (e) => startDrag(e, newDiv));
  newDiv.addEventListener('touchstart', (e) => startDrag(e, newDiv));

  // Append the new div to the body
  document.body.appendChild(newDiv);

  console.log('New content shown!');
}


function clickNo() {
  // Hide the current paper
  hideElementsByClassName('hide'); 

  // Dynamically create a new div
  const newDiv = document.createElement('div');
  newDiv.className = 'paper red';
  newDiv.innerHTML = `
    <p class="p1">বাহ, তোমাকে না বলতে বলেছি </p>
    <p class="p2">তাই না বলেছ,</p>
  `;

  const anotherDiv = document.createElement('div');
  anotherDiv.className = 'paper blue'; // You can change the class name as needed
  anotherDiv.innerHTML = `
    <p class="p1">না হলে তুমি হ্যাঁ বলতে </p>
    <p class="p1">এই বিশ্বাস আমার আছে ।।</p>
  `;

  // Add mouse and touch event handling for dragging
  const startDrag = (e, targetDiv) => {
    console.log('Mouse down or touch start on div');
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

    const offsetX = clientX - targetDiv.getBoundingClientRect().left;
    const offsetY = clientY - targetDiv.getBoundingClientRect().top;

    const onMove = (moveEvent) => {
      targetDiv.style.position = 'absolute';
      const moveClientX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
      const moveClientY = moveEvent.type === 'mousemove' ? moveEvent.clientY : moveEvent.touches[0].clientY;

      targetDiv.style.left = `${moveClientX - offsetX}px`;
      targetDiv.style.top = `${moveClientY - offsetY}px`;
    };

    const endDrag = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', endDrag);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', endDrag);
  };

  newDiv.addEventListener('mousedown', (e) => startDrag(e, newDiv));
  newDiv.addEventListener('touchstart', (e) => startDrag(e, newDiv));
  
  anotherDiv.addEventListener('mousedown', (e) => startDrag(e, anotherDiv)); // Ensure dragging for anotherDiv
  anotherDiv.addEventListener('touchstart', (e) => startDrag(e, anotherDiv)); // Ensure dragging for anotherDiv

  // Append the new divs to the body or a specific container
 
  document.body.appendChild(anotherDiv);
  document.body.appendChild(newDiv);
 // Append anotherDiv to the body

  console.log('New content shown!');
}