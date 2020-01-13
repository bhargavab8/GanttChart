(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		
		<div id="chart_div"></div>		  
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
		
		drawChart(gcData) {
      			var data = new google.visualization.DataTable(gcData);
      			
      			var options = {
        			height: 500
      			};

      			var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

      			chart.draw(data, options);
    		}

		render(gcData) {
			google.charts.load('current', {'packages':['gantt']});
    			google.charts.setOnLoadCallback(drawChart);

    			this.drawChart(drawChart);
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
