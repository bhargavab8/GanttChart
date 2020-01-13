(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div class="ganttContainer" id="ganttContainer"></div>
	`;

	class GanttChart extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$div = shadowRoot.querySelector('div');
				
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
				
				// Set a callback to run when the Google Visualization API is loaded.
    				google.charts.setOnLoadCallback(function() {
					var data = new google.visualization.DataTable();
      					data.addColumn('string', 'Task ID');
      					data.addColumn('string', 'Task Name');
      					data.addColumn('date', 'Start Date');
	      				data.addColumn('date', 'End Date');
      					data.addColumn('number', 'Duration');
      					data.addColumn('number', 'Percent Complete');
      					data.addColumn('string', 'Dependencies');

      					data.addRows([
        					['Research', 'Find sources', new Date(2015, 0, 1), new Date(2015, 0, 5), null,  100,  null],
        					['Write', 'Write paper', null, new Date(2015, 0, 9), 259200000, 25, 'Research,Outline'],
          					['Cite', 'Create bibliography', null, new Date(2015, 0, 7), 86400000, 20, 'Research'],
        					['Complete', 'Hand in paper', null, new Date(2015, 0, 10), 86400000, 0, 'Cite,Write'],
        					['Outline', 'Outline paper', null, new Date(2015, 0, 6), 86400000, 100, 'Research']
      					]);

      					var options = {
        					height: 275
      					};

      					var chart = new google.visualization.Gantt(this.$div);

      					chart.draw(data, options);
				});	
			}
			script.src = 'https://www.gstatic.com/charts/loader.js';

    			//Append it to the document header
    			document.head.appendChild(script);
	  	}
		
		daysToMilliseconds(days) {
      			return days * 24 * 60 * 60 * 1000;
    		}
		
		drawChart(){
			
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
