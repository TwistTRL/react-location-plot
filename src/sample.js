const data =  {
  "Other": {1:{name:"other",start:0,end:500,id:1}},
  "8S": {2:{name:"8s",start:500,end:1000,id:2}},
  "8E": {3:{name:"8e",start:1000,end:1500,id:3}},
  "Home": {4:{name:"home",start:1500,end:2000,id:4}},
  "8S_ongoing": {5:{name:"8s",start:1500,end:Infinity,id:5}},
  "mix":{1:{name:"home",start:0,end:20,id:1},
         2:{name:"other",start:30,end:500,id:2},
         3:{name:"8s",start:500,end:1000,id:3},
         4:{name:"8e",start:1000,end:1500,id:4},
         5:{name:"home",start:1600,end:Infinity,id:5}
        }
}

export default data;
