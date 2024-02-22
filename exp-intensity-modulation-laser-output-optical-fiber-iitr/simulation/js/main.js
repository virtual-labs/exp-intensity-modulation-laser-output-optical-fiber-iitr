var Point=[];
;
(function () {
    
    
    var yy=document.getElementById("check")
    yy.onclick=checkk;
    function checkk()
    {
        if(connections.length==0)
        {
            Swal.fire({
                backdrop:false,
               target: '#exp',
               position:'center',
                customClass: {
                  container: 'position-absolute',
                  popup:"swal2-popup"
                },
                title:'No Connections!!!',
                html: 'Please connect the components as mentioned below:<br>(1-3), (2-4), (5-7), (6-8),<br>(9-11), (10-12), (13-15), (14-16)',
               icon:'error'
                });
               return false
        }
      if(connections.length<8)
       {
        Swal.fire({
        backdrop:false,
       target: '#exp',
       position:'center',
        customClass: {
          container: 'position-absolute',
          popup:"swal2-popup"
        },
        title:'Incomplete Connections!!!',
        html: 'Please go through the <b style="color:#091069">INSTRUCTIONS</b> once.',
       icon:'warning'
        });
       return false}
        
        if (connections.length > 0) {
            var listDiv = []
             for (var j = 0; j < connections.length; j++) {
                listDiv.push(connections[j].sourceId)
                listDiv.push(connections[j].targetId)       
            }
            var f=1
			var num=[]
			for(i=0;i<16;i++){
			 num[i]=Number(listDiv[i].substring(14))
				
			}
         for(var i=0;i<16;i+=2)
         {
			 if((num[i]+1==num[i+1])||(num[i]-1==num[i+1])) continue
			 else {f=0;break;}
         }
         
         if(f==0) {
            Swal.fire({
                backdrop:false,
               target: '#exp',
               position:'center',
                customClass: {
                  container: 'position-absolute',
                  popup:"swal2-popup",
                },
                title:'Wrong Connections!!!',
                html: 'Click on <b style="color:#091069">RESET</b> button and go through the <b style="color:#091069">INSTRUCTIONS</b> once.',
               icon:'error'
                });
		 return false;
		 }
        
        }
		if (f==1) {
			Swal.fire({
                backdrop:false,
               target: '#exp',
               position:'center',
                customClass: {
                  container: 'position-absolute',
                  popup:"swal2-popup"
                },
                title:'Right Connections',
                html: 'Now, click the <b style="color:#091069">START</b> button to read the values for experiment.',
               icon:'success'
                });
			document.getElementById("check").remove();
			document.getElementById("start").disabled=false;
			document.getElementById("start").style.cursor='pointer';
            for(i=0;i<Point.length;i++)
            {
             Point[i].setEnabled(false);
            }
         
			return true;
		 }
    }

        showConnectionInfo = function (listDiv) {
           
                 console.log(listDiv)
        },
        hideConnectionInfo = function () {
            listDiv.style.display = "none";
        },
        connections = [],
        updateConnections = function (conn, remove) {
            if (!remove) connections.push(conn);
            else {
                var idx = -1;
                for (var i = 0; i < connections.length; i++) {
                    if (connections[i] == conn) {
                        idx = i;
                        break;
                    }
                }
                if (idx != -1) connections.splice(idx, 1);
            }
            if (connections.length > 0) {
                var listDiv = []
                 for (var j = 0; j < connections.length; j++) {
                    listDiv.push(connections[j].sourceId)
                    listDiv.push(connections[j].targetId)

                        
                }
                showConnectionInfo(listDiv);
            } else
                hideConnectionInfo();
        };

    jsPlumb.ready(function () {

        var instance = jsPlumb.getInstance();

        // suspend drawing and initialise.
        instance.batch(function () {

            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
                updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
                updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
                //  only remove here, because a 'connection' event is also fired.
                // in a future release of jsplumb this extra connection event will not
                // be fired.
                updateConnections(info.connection, true);
            });


            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
                tolerance: "touch",
                hoverClass: "dropHover",
                activeClass: "dragActive"
            };

            var exampleEndpoint2 = {
                endpoint: ["Dot", { radius: 5 }],
                paintStyle: { fill: "red" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "red", strokeWidth: 5 },
                connector: ["Bezier", { curviness: -10 } ],
                maxConnections:1 ,
                isTarget: true,
                dropOptions: exampleDropOptions
            };
			var exampleEndpoint5 = {
                endpoint: ["Dot", { radius: 5 }],
                paintStyle: { fill: "red" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "red", strokeWidth: 5 },
                connector: ["Bezier", { curviness: -30 } ],
                maxConnections:1 ,
                isTarget: true,
                dropOptions: exampleDropOptions
            };
			var exampleEndpoint4 = {
                endpoint: ["Dot", { radius: 5 }],
                paintStyle: { fill: "black" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "black", strokeWidth: 5 },
                connector: ["Bezier", { curviness: 100 } ],
                maxConnections:1 ,
                isTarget: true,
                dropOptions: exampleDropOptions
            };
			var exampleEndpoint3 = {
                endpoint: ["Dot", { radius: 5 }],
                paintStyle: { fill: "black" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "black", strokeWidth: 5 },
                connector: ["Bezier", { curviness: 10 } ],
                maxConnections:1 ,
                isTarget: true,
                dropOptions: exampleDropOptions
            };

            
			Point.push(instance.addEndpoint("dragDropWindow1", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint2));
            Point.push(instance.addEndpoint("dragDropWindow2", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint2));
            Point.push(instance.addEndpoint("dragDropWindow3", { anchor: [0.75,0 , 0, -1] }, exampleEndpoint3));
            Point.push(instance.addEndpoint("dragDropWindow4", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3));
            Point.push(instance.addEndpoint("dragDropWindow5", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4));
            Point.push(instance.addEndpoint("dragDropWindow6", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4));
			Point.push(instance.addEndpoint("dragDropWindow7", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint5));
			Point.push(instance.addEndpoint("dragDropWindow8", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint5));
			Point.push(instance.addEndpoint("dragDropWindow9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint5));
			Point.push(instance.addEndpoint("dragDropWindow10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint5));
			Point.push(instance.addEndpoint("dragDropWindow11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3));
			Point.push(instance.addEndpoint("dragDropWindow12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3));
			Point.push(instance.addEndpoint("dragDropWindow13", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint5));
			Point.push(instance.addEndpoint("dragDropWindow14", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint5));
			Point.push(instance.addEndpoint("dragDropWindow15", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3));
			Point.push(instance.addEndpoint("dragDropWindow16", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3));
			
            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
                instance.toggleVisible(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
                var s = instance.toggleDraggable(this.getAttribute("rel"));
                this.innerHTML = (s ? 'disable dragging' : 'enable dragging');
                jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
                instance.deleteConnectionsForElement(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
            });

            instance.on(document.getElementById("clear"), "click", function (e) {

                instance.detachEveryConnection();
                showConnectionInfo("");
                jsPlumbUtil.consume(e);
            });
           
        });

        jsPlumb.fire("jsPlumbDemoLoaded", instance);

    });
    
})

()
;
