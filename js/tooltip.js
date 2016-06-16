function Tooltip(elem) {
    this.elem = elem;
    this.dataBtn = [];
    this.buttonEl = [];
}

Tooltip.prototype.init = function() {
    this.getDataBtn();
    this.getButtonEl(this.dataBtn);
    console.log(this.buttonEl);
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

