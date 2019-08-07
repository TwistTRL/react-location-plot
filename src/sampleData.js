function stretch(num,min,max,targetMin,targetMax){
  return (num-min)/(max-min)*(targetMax-targetMin)+targetMin;
}

function sample(array){
  let rand = Math.random();
  let randIdx = Math.floor(rand*array.length);
  return array[randIdx];
}

export const DATA_MIN_X = 1508076120000;

export const DATA_MAX_X = 1509915960000;

export const LOCATION = ( function(){
  let dataPointCount = 10;
  let name = ["other","home","8s","8e"];
  let ret = [];
  let last = null;
  for (let i=0;i<dataPointCount;i++){
    if (last===null) {
      last = {'NAME':sample(name),'START':0,'END':Math.random(),'ID':i};
    }
    else {
      last = {'NAME':sample(name.filter( n=>n!==last["name"] )),'START':last["END"],'END':last["END"]+Math.random(),'ID':i};
    }
    ret.push(last);
  }
  let timeMin = 0;
  let timeMax = Math.max(...ret.map( (rec)=>rec["END"] ));
  ret.forEach( (rec)=>{
      rec["END"] = stretch(rec["END"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
      rec["START"] = stretch(rec["START"],timeMin,timeMax,DATA_MIN_X,DATA_MAX_X);
    });
  return ret;
})();
