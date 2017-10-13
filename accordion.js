var HackyAccordion = function(params){
    
    this.params = {
        speed: false,
        oneOpened: true
    }
    this.accordionClass = 'hacky-accordion';
    this.hackyTitleClass = 'hacky-title';
    this.hackyContentClass = 'hacky-content';
    this.hackyHideClass = 'hacky-hide';
    this.hackyShowClass = 'hacky-show';
    
    this.accordionContentElems = document.getElementsByClassName(this.hackyContentClass);
    this.accordion = document.getElementById(this.accordionClass);
    this.hackyListElems = [];
    
    this.checkNode = function(node) {
        if (node === null) {
            return false;         
        }
        var parentNode = node.parentNode; 

        if (!node.classList.contains(this.hackyTitleClass)) {
            this.checkNode(parentNode);     
        } 

        else {
            return node;    
        }  
    }.bind(this);
    
    this.slide = function(e) { 
        var runSlide = false;
        var hackyTitleNode;
        var recursiveNode;
        if (e.target.classList.contains(this.hackyTitleClass)) {
            runSlide = true;
            hackyTitleNode = e.target;
        }
        else if (recursiveNode = this.checkNode(e.target.parentNode)) {
            runSlide = true; 
            hackyTitleNode = recursiveNode;
        }
        if (runSlide) {
            var accordionListElem = hackyTitleNode.parentNode;
            
            if (hackyTitleNode.nextSibling !== 1) {
                var hackyContentNode = hackyTitleNode.nextSibling.nextSibling; 
            }
            else {
                var hackyContentNode = hackyTitleNode.nextSibling;  
            }
            
            var hackyContentInner = hackyContentNode.childNodes;
            var contentHeight = hackyContentInner[0].offsetHeight;
            
            if (accordionListElem.classList.contains(this.hackyShowClass)) {
                accordionListElem.classList.toggle(this.hackyHideClass); 
                accordionListElem.classList.toggle(this.hackyShowClass); 
            }
            else if (accordionListElem.classList.contains(this.hackyHideClass)) {
                var opendElem;
                if (this.params.oneOpened) {
                    if (opendElem = document.getElementsByClassName(this.hackyShowClass)[0]) {
                        opendElem.classList.toggle(this.hackyHideClass);     
                        opendElem.classList.toggle(this.hackyShowClass);     
                    }
                }
                accordionListElem.classList.toggle(this.hackyHideClass);  
                accordionListElem.classList.toggle(this.hackyShowClass);  
                hackyContentNode.style.height = contentHeight + "px";
            }
        }
    }.bind(this);
    
    //Using the next part as a constuctor, not sure if it makes any sense
    this.loaded = function() {
        if (params) {
            if (params.speed !== undefined && !isNaN(parseFloat(params.speed))) this.params.speed = parseFloat(params.speed);
            if (params.oneOpened !== undefined) this.params.oneOpened = params.oneOpened;
        }

        for (var i = 0; i < this.accordionContentElems.length; i++) {
            var accordionContentElem = this.accordionContentElems[i];
            if (accordionContentElem.nodeType === 1) {
                if (this.params.speed) accordionContentElem.style.transitionDuration = this.params.speed + 's';
                var oldContent = accordionContentElem.innerHTML;
                var wrappedContent = "<div>" + oldContent + "</div>";
                accordionContentElem.innerHTML = wrappedContent;
                this.hackyListElems.push(accordionContentElem.parentNode); 
                accordionContentElem.parentNode.classList.add(this.hackyHideClass);
            }
        } 

        this.accordion.addEventListener('click', this.slide, true );
        
    }.bind(this);
    
    document.addEventListener("DOMContentLoaded", this.loaded);
}