(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div class="container">Gantt Chart
		  <div class="chart_div" id="chart_div">
		  </div>
		</div>	
	`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$div = shadowRoot.querySelector('chart_div');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val) {
			this.$div.innerHTML = '<text class="title" text-anchor="middle" alignment-baseline="middle" font-size="90" font-weight="normal">' + val + '</text>';
			
		}
		  
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			if ("color" in changedProperties) {
				this.$color = changedProperties["color"];
			}
			
			this.render(this.$gcData);
		}
	}
	
	customElements.define("com-demo-gantt", GanttChart);
})();
