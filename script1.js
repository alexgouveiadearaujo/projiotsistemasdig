(function(){
    
 
    let firebaseConfig = {
      apiKey: "AIzaSyBdPYR6E2-AyHVYKhavyRZIUWbl5bDBw80",
      authDomain: "clatalex-3ecdd.firebaseapp.com",
      databaseURL: "https://clatalex-3ecdd.firebaseio.com",
      storageBucket: "clatalex-3ecdd.appspot.com",
      messagingSenderId: "584374255241"
    };
    firebase.initializeApp(firebaseConfig)
    
    /*realTime*/ 
    let database = firebase.database()
  
    let umidade = database.ref('sala/umidade')
    umidade.on('value', onNewData('atualUmidade', '%'))

    let luminosidadeler = database.ref('sala/luminosidade')
    luminosidadeler.on('value', onNewData('atualLuminosidade', '%'))

    let temperatura = database.ref('sala/temperatura')
    temperatura.on('value', onNewData('atualTemperatura', '°C'))

    let distancia = database.ref('sala/distancia')
    distancia.on('value', onNewData('atualDistancia', ''))

    let presenca = database.ref('sala/presenca')
    

    let porta = database.ref('sala/porta')
  
    let luminosidadeOnOff = database.ref('sala/set_luminosidade')
    let arOnOff = database.ref('sala/set_ar')
    let multimidiaOnOff = database.ref('sala/set_multimidia')
    let portaOnOff = database.ref('sala/set_porta')
  
    
    /**/ 
    
  
 
   presenca.on('value', function(alt){
    let value = alt.val();
    let el = document.getElementById('atualPresenca')
    if(value == 1){
      el.classList.add('white-text')
    }else if(value == 0){
      el.classList.remove('white-text')
    }
   })
  
   

   porta.on('value', function(alt){
    let value = alt.val()
    let el = document.getElementById('atualPorta')
    if(value == 1){
      el.classList.add('white-text')
    }else if(value == 0){
      el.classList.remove('white-text')
    }
   })

   
  
    let estadoSetLuminosidade = false;
    luminosidadeOnOff.on('value', function(alt){
      let value = alt.val()
      let el = document.getElementById('estadoSetLuminosidade')
      if(value){
        el.classList.add('white-text')
      }else{
        el.classList.remove('white-text')
      }
      estadoSetLuminosidade = !!value
    })
  
    let botaoLuminosidade = document.getElementById('botaoLuminosidade')
    botaoLuminosidade.addEventListener('click', function(evt){
      if(estadoSetLuminosidade == true) {
        luminosidadeOnOff.set(0)
      } else {
        luminosidadeOnOff.set(1)
      }
    })

    
  
    let estadoSetAr = false;
    arOnOff.on('value', function(alt){
      let value = alt.val();
      let el = document.getElementById('estadoSetAr')
      if(value){
        el.classList.add('white-text')
      }else{
        el.classList.remove('white-text')
      }
      estadoSetAr = !!value
    })
  
    let botaoAr = document.getElementById('botaoAr')
    botaoAr.addEventListener('click', function(evt){
      if(estadoSetAr == true) {
        arOnOff.set(0)
      } else {
        arOnOff.set(1)
      }
    })


  
    let estadoSetMultimidia = false
    multimidiaOnOff.on('value', function(alt){
      let value = alt.val()
      let el = document.getElementById('estadoSetMultimidia')
      if(value){
        el.classList.add('white-text')
      }else{
        el.classList.remove('white-text')
      }
      estadoSetMultimidia = !!value
    })
  
    let botaoMultimidia = document.getElementById('botaoMultimidia')
    botaoMultimidia.addEventListener('click', function(evt){
      if(estadoSetMultimidia == true) {
        multimidiaOnOff.set(0)
      } else {
        multimidiaOnOff.set(1)
      }
    })
  
    let estadoSetPorta = false
    portaOnOff.on('value', function(alt){
      let value = alt.val()
      let el = document.getElementById('estadoSetPorta')
      if(value){
        el.classList.add('white-text')
      }else{
        el.classList.remove('white-text')
      }
      estadoSetPorta = !!value
    })
  
    let btnPorta = document.getElementById('botaoPorta')
    btnPorta.addEventListener('click', function(evt){
      if(estadoSetPorta == true) {
        portaOnOff.set(0)
      } else {
        portaOnOff.set(1)
      }
    })
  
  })()
  
  

  
  function onNewData(currentValueEl, metric){
    return function(alt){
      let readings = alt.val()
      if(readings){
          let currentValue
          let data = []
          for(let key in readings){
            currentValue = readings[key]
            data.push(currentValue)
          } 
  
          if(currentValueEl == 'currentTemp') {
            readings = readings.toFixed(1)
          } 
  
          document.getElementById(currentValueEl).innerText = readings + ' ' + metric
      }
    }
  }