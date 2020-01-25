(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
		    <div id="ganttChartNew"></div>
	  `;
    
    let gLibLoaded = false;
    
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
	    
        render(val) {
            if(!gLibLoaded){
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.onload = function () {
                    gLibLoaded = true;
                    
                    if(val!==''){
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
                            
			    var rows = val.split(";");
			    var columns = '';
			    var rowIndex = 0;
			    var colIndex = 0;
			    var dataRows = [];
                            var chartData = [];

			    var colData = '';
			    for(rowIndex=0;rowIndex<rows.length;rowIndex++){
			        columns = rows[rowIndex].split(",");
				dataRows = [];
			        for(colIndex=0;colIndex<columns.length;colIndex++){
				    colData = columns[colIndex].split(":");
				    if(colIndex===0){
					dataRows.push(colData[1]);
					dataRows.push(colData[1]);				        
				    }
				    else if(colIndex===1){
                                        dataRows.push(colData[1]);					  
				    }
				    else if(colIndex===2 || colIndex===3){
                                        dataRows.push(new Date(Date.parse(colData[1])));					  
				    }
				    else if(colIndex===4){
					dataRows.push(null);
 					dataRows.push(Number(colData[1]));  
					dataRows.push(null); 
				    }  
			        } 
				chartData.push(dataRows);                               
			    }
                            data.addRows(chartData);
			    console.log(chartData);
			    var options = {
				height: 400,    
                   		gantt: {
                        		criticalPathEnabled: false
				}
		   	    };

                            const ganttCont = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#ganttChartNew");
                            var chart = new google.visualization.Gantt(ganttCont);
                            chart.draw(data, options);
                        });                            
                    }
                }
                script.src = 'https://www.gstatic.com/charts/loader.js';
                //Append it to the document header
                document.head.appendChild(script);
            }
	    else if(val!==''){
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
                            
		   var rows = val.split(";");
		   var columns = '';
		   var rowIndex = 0;
		   var colIndex = 0;
		   var dataRows = [];
                   var chartData = [];

		   var colData = '';
		   for(rowIndex=0;rowIndex<rows.length;rowIndex++){
		       columns = rows[rowIndex].split(",");
		       dataRows = [];
		       for(colIndex=0;colIndex<columns.length;colIndex++){
		 	   colData = columns[colIndex].split(":");
			   if(colIndex===0){
			       dataRows.push(colData[1]);
			       dataRows.push(colData[1]);				        
			   }
			   else if(colIndex===1){
                               dataRows.push(colData[1]);					  
			   }
			   else if(colIndex===2 || colIndex===3){
                               dataRows.push(new Date(Date.parse(colData[1])));					  
			   }
			   else if(colIndex===4){
			       dataRows.push(null);
 			       dataRows.push(Number(colData[1]));  
			       dataRows.push(null); 
			   }  
		       }    
		       chartData.push(dataRows);                               
		   }
                   data.addRows(chartData);
		   console.log(chartData);
                   var options = {
			height: 400,
                   	gantt: {
                        	criticalPathEnabled: false
			}
		   };

                   const ganttCont = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#ganttChartNew");
                   var chart = new google.visualization.Gantt(ganttCont);
                   chart.draw(data, options);
               });		    
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
    customElements.define("com-demo-gantt-chart", GanttChartNew);
})();
