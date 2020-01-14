(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
		    <div id="ganttChartNew"></div>
	  `;
    
    let gLibLoaded = false;
    let jQryLibLoaded = false;
    
    class GanttChartNew extends HTMLElement {
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
	
	loadJQuery(){
	    if(!jQryLibLoaded){
		const jQScript = document.createElement('script');
                jQScript.type = 'text/javascript';
                jQScript.async = true;
                jQScript.onload = function () {
                    jQryLibLoaded = true;
		}
		jQScript.src = 'https://code.jquery.com/jquery-3.4.1.js';
    		//Append it to the document header
    		document.head.appendChild(jQScript);  	    
	    }
	}
	    
        render(val) {
            if(val===''){
                if(!gLibLoaded){
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.onload = function () {
                        gLibLoaded = true;
                        // Load the Visualization API and the ganttchart package.
                        google.charts.load('current', {'packages':['gantt']});

                        //Set a callback to run when the Google Visualization API is loaded.
                        google.charts.setOnLoadCallback(function() {
                            var data = new google.visualization.DataTable();
                            data.addColumn('string', 'Task ID');
                            data.addColumn('string', 'Task Name');
                            data.addColumn('string', 'Resource');
                            data.addColumn('date', 'Start Date');
                            data.addColumn('date', 'End Date');
                            data.addColumn('number', 'Duration');
                            data.addColumn('number', 'Percent Complete');
                            data.addColumn('string', 'Dependencies');

                            data.addRows([
                                ['2014Spring', 'Spring 2014', 'spring', new Date(2014, 2, 22), new Date(2014, 5, 20), null, 100, null],
                                ['2014Summer', 'Summer 2014', 'summer', new Date(2014, 5, 21), new Date(2014, 8, 20), null, 100, null],
                                ['2014Autumn', 'Autumn 2014', 'autumn', new Date(2014, 8, 21), new Date(2014, 11, 20), null, 100, null],
                                ['2014Winter', 'Winter 2014', 'winter', new Date(2014, 11, 21), new Date(2015, 2, 21), null, 100, null],
                                ['2015Spring', 'Spring 2015', 'spring', new Date(2015, 2, 22), new Date(2015, 5, 20), null, 50, null],
                                ['2015Summer', 'Summer 2015', 'summer', new Date(2015, 5, 21), new Date(2015, 8, 20), null, 0, null],
                                ['2015Autumn', 'Autumn 2015', 'autumn', new Date(2015, 8, 21), new Date(2015, 11, 20), null, 0, null],
                                ['2015Winter', 'Winter 2015', 'winter', new Date(2015, 11, 21), new Date(2016, 2, 21), null, 0, null],
                                ['Football', 'Football Season', 'sports', new Date(2014, 8, 4), new Date(2015, 1, 1), null, 100, null],
                                ['Baseball', 'Baseball Season', 'sports', new Date(2015, 2, 31), new Date(2015, 9, 20), null, 14, null],
                                ['Basketball', 'Basketball Season', 'sports', new Date(2014, 9, 28), new Date(2015, 5, 20), null, 86, null],
                                ['Hockey', 'Hockey Season', 'sports', new Date(2014, 9, 8), new Date(2015, 5, 21), null, 89, null]
                            ]);

                            var options = {
                            	height: 400,
                                gantt: {
                                	trackHeight: 30
                                }
                            };

                            const ganttCont = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#ganttChartNew");
                            var chart = new google.visualization.Gantt(ganttCont);
                            chart.draw(data, options);
                        });                            
                    }    
                    script.src = 'https://www.gstatic.com/charts/loader.js';
                    //Append it to the document header
                    document.head.appendChild(script);
                }
            }
	    else{
	        // Load the Visualization API and the ganttchart package.
    		google.charts.load('current', {'packages':['gantt']});
				
		//Set a callback to run when the Google Visualization API is loaded.
    		google.charts.setOnLoadCallback(function() {
		    $.getJSON(val).done(function (jsonData) {
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
    			const ganttCont = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#ganttContainer");
			var chart = new google.visualization.Gantt(ganttCont);
			chart.draw(data, options);
    		    }).fail(function(){console.log("Failed")});
		}
	    }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            if ("value" in changedProperties) {
                this.$value = changedProperties["value"];
            }
	    //this.loadJQuery();	
            this.render(this.$value);
        }
    }
    customElements.define("com-demo-gantt-chart", GanttChartNew);
})();
