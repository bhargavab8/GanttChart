(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div class="container">
		  <div class="ganttContainer" id="ganttContainer">	    
		   </div>
		</div>
	`;

	class GanttChart extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val) {
			const script = document.createElement('script');
    			script.type = 'text/javascript';
    			script.async = true;
    			script.onload = function () {
				// Load the Visualization API and the piechart package.
    				google.charts.load('current', {'packages':['gantt']});
			}
			script.src = 'https://www.gstatic.com/charts/loader.js';

    			//Append it to the document header
    			document.head.appendChild(script);
	  	}
		  
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
      this.render(this.$value);
		}
	}
	
	customElements.define("com-demo-gantt", GanttChart);
})();
