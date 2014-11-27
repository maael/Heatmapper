var Heatmap = function(options){
  var options = options || {},
  domain = options.domain || "",
  page = options.page || "",
  startBtn = options.startBtn || "",
  endBtn = options.endBtn || "",
  storedProcedures = [],
  storedListeners = {},
  running = false,
  self = this;
  /*
  window.addEventListener('onload', function(event) {
    this.startMapping();
  });
  window.addEventListener('unload', function(event) {
    this.stopMapping();
  });
  */
  this.saveLog = function () {
    var data = {'pageTitle':document.title,'storedProcedures':storedProcedures};
    localStorage.setItem('heatmap',JSON.stringify(data));
    this.heatLog('Heatmap for '+document.title+' saved.');
  };
  this.heatLog = function (message) {
    var heatmapStyle = 'background-color:#f2dede;color:#a94442;font-weight:bold;padding:2px;',
      messageStyle = 'background-color:#f2dede;color:#000000;padding:2px;';
    console.log('%c Heatmap | %c'+message+' ',heatmapStyle,messageStyle);
  };
  this.startMapping = function () {
    running = true;
    function extractInformation (e) {
      var newE = {};
      newE.altKey = e.altKey;
      newE.clientX = e.clientX;
      newE.clientY = e.clientY;
      newE.controlKey = e.controlKey;
      newE.defaultPrevented = e.defaultPrevented;
      newE.fromElement = e.fromElement;
      newE.keyCode = e.keyCode;
      newE.pageX = e.pageX;
      newE.pageY = e.pageY;
      newE.returnedValue = e.returnedValue;
      newE.screenX = e.screenX;
      newE.screenY = e.screenY;
      newE.shiftKey = e.shiftKey;
      newE.srcElement = e.srcElement.id;
      newE.target = e.target.id;
      newE.timeStamp = e.timeStamp;
      newE.toElement = e.toElement.id;
      newE.type = e.type;
      newE.x = e.x;
      newE.y = e.y;
      return newE;
    }
    this.heatLog('Heatmap is logging.');
    storedListeners['click'] = function (e) {
      if(e.srcElement.id != startBtn && e.srcElement.id != endBtn) {
        storedProcedures.push(extractInformation(e));
      }
    };
    storedListeners['dblclick'] = function (e) {
      if(e.srcElement.id != startBtn && e.srcElement.id != endBtn) {
        storedProcedures.push(extractInformation(e));
      }
    };
    storedListeners['mousemove'] = function (e) {
      storedProcedures.push(extractInformation(e));
    };
    storedListeners['contextmenu'] = function (e) {
      storedProcedures.push(extractInformation(e));
    };
    storedListeners['wheel'] = function (e) {
      storedProcedures.push(extractInformation(e));
    };
    storedListeners['focus'] = function (e) {
      storedProcedures.push(extractInformation(e));
    };
    storedListeners['keydown'] = function (e) {
      storedProcedures.push(extractInformation(e));
    };
    var documentBody = document.getElementsByTagName('body')[0];
    for(var listenerType in storedListeners) {
       documentBody.addEventListener(listenerType, storedListeners[listenerType], false);
    }
  };
  this.stopMapping = function () {
    if (running) {
      var documentBody = document.getElementsByTagName('body')[0];
      for(var listenerType in storedListeners) {
         documentBody.removeEventListener(listenerType,storedListeners[listenerType],false);
      }
      running = false;
      this.heatLog('Heatmap has stopped. '+storedProcedures.length+' events captured.');
      this.anaylize();
      this.saveLog();
    } else {
      this.heatLog('Error: Heatmap was not running, so cannot be stopped.');
    }
  };
  this.log = storedProcedures;
  this.anaylize = function () {
    var metrics = {};
    storedProcedures.forEach(function(element,index,array){
      if (metrics[element.type]===undefined) {
        metrics[element.type] = 1;
      } else {
        metrics[element.type]++;
      }
    });
    for (var type in metrics) {
      var typeName = type;
      for(var i = 15-type.length; i > 0;i--) {
        typeName += " ";
      }
      this.heatLog(typeName + "|\t" + metrics[type]);
    }
  };
  return this;
};
