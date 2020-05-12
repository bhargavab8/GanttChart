(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
		    <div id="odataContent" style='overflow-x:hidden;overflow-y:scroll;height:500px'></div>
	  `;
    
    let odataContentDiv;
    class C4CODATANew extends HTMLElement {
		    constructor() {
			      super(); 
			      let shadowRoot = this.attachShadow({mode: "open"});
			      shadowRoot.appendChild(template.content.cloneNode(true));
			      odataContentDiv = shadowRoot.querySelector("#odataContent");
			      this.addEventListener("click", event => {
				        var event = new Event("onClick");
				        this.dispatchEvent(event);
			      });
			      this._props = {};
		    }
	    
        render(value) {
            var odataURL = "https://my348282.crm.ondemand.com/sap/c4c/odata/analytics/ds/Bpcsdb.svc/Bpcsdb?$select=C_x1ANx34e0f28ff0ceb33&$format=json";
            $.getJSON(odataURL).done(function (jsonData) {
                console.log(jsonData);
		var rowIndex=1;
		var rawData='';
		$.each(jsonData.d.results, function( key, val ) {
    			console.log(val.C_x1ANx34e0f28ff0ceb33);
			rawData = rawData+"<div>Row Number: "+rowIndex+"</div>"+val.C_x1ANx34e0f28ff0ceb33;			
			rowIndex=rowIndex+1;
  		});
		odataContentDiv.innerHTML=rawData;    
            }).fail(function(){console.log("Failed")});
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
    customElements.define("com-demo-c4codata", C4CODATANew);
})();
