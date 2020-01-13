(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<div class="container">
		  <div class="row">
		    <svg viewBox="0 0 1000 500">
		    </svg>
		   </div>
		</div>
	`;

	class GanttChart extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$svg = shadowRoot.querySelector('svg');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val) {
			this.$svg.innerHTML = '<text class="percentage" text-anchor="middle" alignment-baseline="middle" font-size="140" font-weight="bold">' + val + '</text>';
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
