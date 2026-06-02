function walkdog(){

    return new promise((resolve,reject)=>{
         setTimeout(()=>{
        resolve(`go walk the dog`);
    },1500);
    });
}

function cleankitch(){

    return new promise((resolve , reject)=>{
  setTimeout(() => {
        resolve(`you can clean the kitchen`);
    }, 2500);
    })
}

function trash(){

    return new promise((resolve,reject)=>{
         setTimeout(()=>{
        resolve(`clean the trash`); 
    },500);
    })
}

walkdog().then(value =>{console.log(value); return cleankitch()}) 
         .then(value=>{console.log(value); return trash()})
         .then(value => {console.log(value); console.log((`well done , You have completed your work!`))})