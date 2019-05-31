const data =  {
  "Other": [{name:"other",start:0,end:500}],
  "8S": [{name:"8s",start:500,end:1000}],
  "8E": [{name:"8e",start:1000,end:1500}],
  "Home": [{name:"home",start:1500,end:2000}],
  "8S_ongoing": [{name:"8s",start:1500,end:Infinity}],
  "mix": [{name:"home",start:0,end:20},
          {name:"other",start:30,end:500},
          {name:"8s",start:500,end:1000},
          {name:"8e",start:1000,end:1500},
          {name:"home",start:1600,end:Infinity}
          ]
}

export default data;
