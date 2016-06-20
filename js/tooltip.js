function Tooltip(elem) {
    this.elem = elem;
    this.dataBtn = [];
    this.buttonEl = [];
    this.buttonElCords = [];
    this.elemCords = [];
    this.tooltipVisible = false;
}

Tooltip.prototype.init = function() {

    this.getDataBtn();
    this.getButtonEl(this.dataBtn);
    this.onButtonClick();
    this.checkDataAttrVisible();


    //corrected position of the tooltip if that tooltip is visible
    if(!this.isHidden(this.elem)) {
        this.setBtnCords();
        this.setElemCords();
        this.positioningElem();
        this.checkElemCords();

    }

    //check global param torn on/off visibility of tooltips
    if(this.tooltipVisible) {
        this.showTooltip();
    } else {
        this.hideTooltip();
    }

    window.addEventListener('resize', function(){
        this.setBtnCords();
        this.setElemCords();
        this.checkElemCords();
        this.positioningElem();
    }.bind(this));
};


Tooltip.prototype.isHidden = function(elem) {
    return !elem.offsetWidth && !elem.offsetHeight;
};

Tooltip.prototype.getDataBtn = function() {
    this.dataBtn.push(this.elem.dataset.btn);
};

Tooltip.prototype.getButtonEl = function(buttonClass) {
    var buttons = document.querySelectorAll('.' + buttonClass);

    for( var i = 0; i < buttons.length; i++) {
        this.buttonEl.push(buttons[i]);
    }
};

Tooltip.prototype.onButtonClick = function() {
  var self = this;
  for(var i = 0; i < this.buttonEl.length; i++) {
      this.buttonEl[i].addEventListener('click', function(){

          if(!self.tooltipVisible) {
              self.showTooltip();
              if(!self.isHidden(self.elem)) {
                  self.setBtnCords();
                  self.setElemCords();
                  self.checkElemCords();
                  self.positioningElem();
              }

          } else {
              self.hideTooltip();
          }

      });
  }

};

Tooltip.prototype.showTooltip = function() {
  this.tooltipVisible = true;
  this.elem.style.display = 'block';
};

Tooltip.prototype.hideTooltip = function() {
  this.tooltipVisible = false;
  this.elem.style.display = 'none';
};


Tooltip.prototype.checkDataAttrVisible = function() {
    if(this.elem.dataset.visible) {
       if(this.elem.dataset.visible === 'true') {
           this.showTooltip();
       } else {
           this.hideTooltip();
       }
    }
};

Tooltip.prototype.setBtnCords = function() {
    var cords = {};
    for(var i = 0; i < this.buttonEl.length; i++) {
        cords.left = this.buttonEl[i].getBoundingClientRect().left;
        cords.right = this.buttonEl[i].getBoundingClientRect().right;
        cords.top = this.buttonEl[i].getBoundingClientRect().top;
        cords.bottom = this.buttonEl[i].getBoundingClientRect().bottom;
        this.buttonElCords.push(cords);
    }
};

Tooltip.prototype.setElemCords = function() {
    var cords = {};
        cords.left = this.elem.getBoundingClientRect().left;
        cords.right = this.elem.getBoundingClientRect().right;
        cords.top =  this.elem.getBoundingClientRect().top;
        cords.bottom = this.elem.getBoundingClientRect().bottom;
        this.elemCords.push(cords);
};

Tooltip.prototype.positioningElem = function() {

    for(var i = 0; i < this.buttonElCords.length; i++) {
        this.elem.style.top = this.buttonElCords[i].top + 'px';


        if (this.elem.classList.contains('left')) {

            this.elem.style.top = this.buttonElCords[i].top - ((this.elem.offsetHeight / 2) - ((this.buttonElCords[i].bottom - this.buttonElCords[i].top) / 2)) + 'px';
            this.elem.style.left = this.buttonElCords[i].right - ((this.buttonElCords[i].right - this.buttonElCords[i].left) + this.elem.offsetWidth) + 'px';



        } else if(this.elem.classList.contains('right')) {

            this.elem.style.top = this.buttonElCords[i].top - ((this.elem.offsetHeight / 2) - ((this.buttonElCords[i].bottom - this.buttonElCords[i].top) / 2)) + 'px';
            this.elem.style.left = this.buttonElCords[i].right + 'px';


        } else if(this.elem.classList.contains('top')) {

            this.elem.style.top = this.buttonElCords[i].top - this.elem.offsetHeight + 'px';
            this.elem.style.left = this.buttonElCords[i].left - ((this.elem.offsetWidth / 2) - ((this.buttonElCords[i].right - this.buttonElCords[i].left) / 2)) + 'px';


        } else if(this.elem.classList.contains('bottom')) {


            this.elem.style.top = this.buttonElCords[i].top +((this.buttonElCords[i].bottom - this.buttonElCords[i].top)) + 'px';
            this.elem.style.left = this.buttonElCords[i].left - ((this.elem.offsetWidth / 2) - ((this.buttonElCords[i].right - this.buttonElCords[i].left) / 2)) + 'px';


        }  else {
            this.elem.style.top = this.buttonElCords[i].top + 'px';
            this.elem.style.left = this.buttonElCords[i].left + 'px';
        }
    }
};


Tooltip.prototype.checkElemCords = function() {
    for(var i = 0; i < this.elemCords.length; i++) {
        if(this.elemCords[i].top < 0) {
            this.toggleClass(this.elem, 'top', 'bottom');
            this.positioningElem();
        } else if(this.elemCords[i].left < 0) {
            this.toggleClass(this.elem, 'left', 'right');
            this.positioningElem();
        }
    }

};


Tooltip.prototype.toggleClass = function(elem, oldClass, newClass) {
    elem.classList.remove(oldClass);
    elem.classList.add(newClass);
};




