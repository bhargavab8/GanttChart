(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `		    
		<style>
		#amChartGaugediv{
  			width: 100%;
  			height: 400px;
		}
		</style>  
		<div id="amChartGaugediv"></div>
	  `;
    
    let amChartsLibLoaded = 0;
        
    class AMChartGaugeNew extends HTMLElement {
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
	    var rows = val.split(",");
	    var rowIndex = 0;
	    var perComp = 0;
	    for(rowIndex=0;rowIndex<rows.length;rowIndex++){
		perComp = perComp+Number(rows[rowIndex]);
	    }
 	    if(rows.length !== 0){
	       perComp = perComp/rows.length;
	    }
		
	    if(amChartsLibLoaded === 0){
		const script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.onload = function () {
		    const chartscript = document.createElement('script');
                    chartscript.type = 'text/javascript';
                    chartscript.async = true;
		    chartscript.onload = function () {
			const chartanmscript = document.createElement('script');
                    	chartanmscript.type = 'text/javascript';
                    	chartanmscript.async = true;
		    	chartanmscript.onload = function () {
			    amChartsLibLoaded = 1;
			    am4core.ready(function() {
		                am4core.useTheme(am4themes_animated);
				// create chart
				const amChartGauge = document.querySelector("#__widget2").querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#amChartGaugediv");    
				var chart = am4core.create(amChartGauge, am4charts.GaugeChart);
				chart.innerRadius = am4core.percent(82);

				/**
				* Normal axis
				*/
				var axis = chart.xAxes.push(new am4charts.ValueAxis());
				axis.min = 0;
				axis.max = 100;
				axis.strictMinMax = true;
				axis.renderer.radius = am4core.percent(80);
				axis.renderer.inside = true;
				axis.renderer.line.strokeOpacity = 1;
				axis.renderer.ticks.template.disabled = false
				axis.renderer.ticks.template.strokeOpacity = 1;
				axis.renderer.ticks.template.length = 10;
				axis.renderer.grid.template.disabled = true;
				axis.renderer.labels.template.radius = 35;
				axis.renderer.labels.template.adapter.add("text", function(text) {
				    return text;
				});

				/**
				* Axis for ranges
				*/
				var colorSet = new am4core.ColorSet();
				var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
				axis2.min = 0;
				axis2.max = 100;
				axis2.renderer.innerRadius = 10
				axis2.strictMinMax = true;
				axis2.renderer.labels.template.disabled = true;
				axis2.renderer.ticks.template.disabled = true;
				axis2.renderer.grid.template.disabled = true;

				var range0 = axis2.axisRanges.create();
				range0.value = 0;
				range0.endValue = 50;
				range0.axisFill.fillOpacity = 1;
				range0.axisFill.fill = colorSet.getIndex(0);

				var range1 = axis2.axisRanges.create();
				range1.value = 50;
				range1.endValue = 100;
				range1.axisFill.fillOpacity = 1;
				range1.axisFill.fill = colorSet.getIndex(2);

				/**
				* Label
				*/
				var label = chart.radarContainer.createChild(am4core.Label);
				label.isMeasured = false;
				label.fontSize = 20;
				label.x = am4core.percent(50);
				label.y = am4core.percent(100);
				label.horizontalCenter = "middle";
				label.verticalCenter = "bottom";
				label.text = perComp+"%";

				/**
				* Hand
				*/
				var hand = chart.hands.push(new am4charts.ClockHand());
				hand.axis = axis2;
				hand.innerRadius = am4core.percent(20);
				hand.startWidth = 6;
				hand.pin.disabled = true;
				hand.value = perComp;

				hand.events.on("propertychanged", function(ev) {
				    range0.endValue = ev.target.value;
				    range1.value = ev.target.value;
				    axis2.invalidate();
				});
			    });
			}
			chartanmscript.src = 'https://www.amcharts.com/lib/4/themes/animated.js';
    		    	//Append it to the document header
    		    	document.head.appendChild(chartanmscript); 
		    }
		    chartscript.src = 'https://www.amcharts.com/lib/4/charts.js';
    		    //Append it to the document header
    		    document.head.appendChild(chartscript); 
		}
		script.src = 'https://www.amcharts.com/lib/4/core.js';
    		//Append it to the document header
    		document.head.appendChild(script); 			    
	    }
	    else{
		    am4core.ready(function() {
		            am4core.useTheme(am4themes_animated);
		            // create chart
		            const amChartGauge = document.querySelector("#__widget2").querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#amChartGaugediv");				    
			    var chart = am4core.create(amChartGauge, am4charts.GaugeChart);
		            chart.innerRadius = am4core.percent(82);

				/**
				* Normal axis
				*/
				var axis = chart.xAxes.push(new am4charts.ValueAxis());
				axis.min = 0;
				axis.max = 100;
				axis.strictMinMax = true;
				axis.renderer.radius = am4core.percent(80);
				axis.renderer.inside = true;
				axis.renderer.line.strokeOpacity = 1;
				axis.renderer.ticks.template.disabled = false
				axis.renderer.ticks.template.strokeOpacity = 1;
				axis.renderer.ticks.template.length = 10;
				axis.renderer.grid.template.disabled = true;
				axis.renderer.labels.template.radius = 35;
				axis.renderer.labels.template.adapter.add("text", function(text) {
				    return text;
				});

				/**
				* Axis for ranges
				*/
				var colorSet = new am4core.ColorSet();
				var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
				axis2.min = 0;
				axis2.max = 100;
				axis2.renderer.innerRadius = 10
				axis2.strictMinMax = true;
				axis2.renderer.labels.template.disabled = true;
				axis2.renderer.ticks.template.disabled = true;
				axis2.renderer.grid.template.disabled = true;

				var range0 = axis2.axisRanges.create();
				range0.value = 0;
				range0.endValue = 50;
				range0.axisFill.fillOpacity = 1;
				range0.axisFill.fill = colorSet.getIndex(0);

				var range1 = axis2.axisRanges.create();
				range1.value = 50;
				range1.endValue = 100;
				range1.axisFill.fillOpacity = 1;
				range1.axisFill.fill = colorSet.getIndex(2);

				/**
				* Label
				*/
				var label = chart.radarContainer.createChild(am4core.Label);
				label.isMeasured = false;
				label.fontSize = 20;
				label.x = am4core.percent(50);
				label.y = am4core.percent(100);
				label.horizontalCenter = "middle";
				label.verticalCenter = "bottom";
				label.text = perComp+"%";

				/**
				* Hand
				*/
				var hand = chart.hands.push(new am4charts.ClockHand());
				hand.axis = axis2;
				hand.innerRadius = am4core.percent(20);
				hand.startWidth = 6;
				hand.pin.disabled = true;
				hand.value = perComp;

				hand.events.on("propertychanged", function(ev) {
				    range0.endValue = ev.target.value;
				    range1.value = ev.target.value;
				    axis2.invalidate();
				});

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
    customElements.define("com-demo-amchart-gauge", AMChartGaugeNew);
})();
