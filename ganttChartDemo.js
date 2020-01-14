(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div id="ganttContainer" class="ganttContainer"></div>
	`;
	
	let gLibLoaded;
	let jQryLibLoaded;
	
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
	        if(!gLibLoaded){
		    const script = document.createElement('script');
    		    script.type = 'text/javascript';
    		    script.async = true;
    		    script.onload = function () {
			gLibLoaded = true;
			
			if(!jQryLibLoaded){
			    const jQScript = document.createElement('script');
    		            jQScript.type = 'text/javascript';
    		    	    jQScript.async = true;
    		    	    jQScript.onload = function () {
				jQryLibLoaded = true;
				    
				// Load the Visualization API and the ganttchart package.
    				google.charts.load('current', {'packages':['gantt']});
				
				// Set a callback to run when the Google Visualization API is loaded.
    				google.charts.setOnLoadCallback(function() {
				    $.getJSON("https://vishwapkm-ey.github.io/GanttChart/gGanttExample.json").done(function (jsonData) {
    	
					// Create our data table out of JSON data loaded from server.
    					var data = new google.visualization.DataTable(jsonData);

    					var options = {
      					    //explorer: {axis: 'horizontal'}
      					    height: 275,
      					    gantt: {
        					defaultStartDateMillis: new Date(2019, 1, 1)
      					    }
    					};

    					// Instantiate and draw our chart, passing in some options.
    					const ganttCont = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector(".ganttContainer");
					var chart = new google.visualization.Gantt(ganttCont);
					chart.draw(data, options);
    				    }).fail(function(){console.log("Failed")});					
				});
			    }	
			    jQScript.src = 'https://code.jquery.com/jquery-3.4.1.js';
    			    //Append it to the document header
    			    document.head.appendChild(jQScript);    	
			}
			
		    }
		    script.src = 'https://www.gstatic.com/charts/loader.js';
    		    //Append it to the document header
    		    document.head.appendChild(script);
		}
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
