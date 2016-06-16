function Tooltip(elem) {
    this.elem = elem;
    this.dataBtn = [];
    this.buttonEl = [];
    this.buttonElCords = [];
    this.tooltipVisible = false;
}

Tooltip.prototype.init = function() {
    this.getDataBtn();
    this.getButtonEl(this.dataBtn);
    this.onButtonClick();
    this.setBtnCords();
    this.getTooltipCords();
    if(this.tooltipVisible) {
        this.showTooltip();
    } else {
        this.hideTooltip();
    }
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

Tooltip.prototype.getTooltipCords = function() {
    for(var i = 0; i < this.buttonElCords.length; i++) {
        this.elem.style.top = this.buttonElCords[i].top + 'px';


        if (this.elem.classList.contains('left')) {

            this.showTooltip();
            this.elem.style.top = this.buttonElCords[i].top + 'px';
            this.elem.style.left = this.buttonElCords[i].right - ((this.buttonElCords[i].right - this.buttonElCords[i].left) + this.elem.offsetWidth) + 'px';
            this.hideTooltip();

        } else if(this.elem.classList.contains('right')) {

            this.elem.style.top = this.buttonElCords[i].top + 'px';
            this.elem.style.left = this.buttonElCords[i].right + 'px';

        } else if(this.elem.classList.contains('top')) {

            this.showTooltip();
            this.elem.style.top = this.buttonElCords[i].top - this.elem.offsetHeight + 'px';
            this.elem.style.left = this.buttonElCords[i].left + 'px';
            this.hideTooltip();

        } else if(this.elem.classList.contains('bottom')) {

            this.showTooltip();
            this.elem.style.top = this.buttonElCords[i].top +((this.buttonElCords[i].bottom - this.buttonElCords[i].top)) + 'px';
            this.elem.style.left = this.buttonElCords[i].left + 'px';
            this.hideTooltip();

        } else {
            this.elem.style.top = this.buttonElCords[i].top + 'px';
            this.elem.style.left = this.buttonElCords[i].left + 'px';
        }
    }
};
