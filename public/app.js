document.addEventListener("click", event =>{
    if( event.target.dataset.type === 'remove'){
        const id = event.target.dataset.id;
     
        remove(id).then(()=>{
            event.target.closest('li').remove()
        })
    }else if(event.target.dataset.type === 'edit'){
        const id = event.target.dataset.id;
        let title = event.target.dataset.title;
        const result = prompt("Введите новое название");
            title = result;
        put(id).then(()=>{
            
            
        })
            
            // if(event.target.closest('li').textContent === result && event.target.closest('li').textContent === false){
            //     console.log("hello")
            // }else{
            //     event.target.closest('li').textContent === result
            // }
            
        
        
        // const searchId = document.querySelector(`[data-id="${id}"]`)
        // // console.log(searchId)
        // const result = prompt("Кто ты ?");
        // searchId.textContent = result
        
    }

})

async function remove(id){
   await fetch(`/${id}`,{method:"DELETE"})
}

async function put(id){
    await fetch(`/${id}`,{method:"PUT"})
 }