(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div id='text_div'>Gantt Chart</div>
		<div id="chart_div"></div>		  
	`;

	class GanttChart extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$div = shadowRoot.querySelector('svg');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(gcData) {
			this.$div.innerHTML = '<text id="gcData_text">' + gcData + '</text>'
    		}
		  
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("gcData" in changedProperties) {
				this.$gcData = changedProperties["gcData"];
			}
			
			this.render(this.$gcData);
		}
	}
	
	customElements.define("com-demo-gantt", GanttChart);
})();
