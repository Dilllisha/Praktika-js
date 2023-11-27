function createItem(item,desc,image,id){
  div = document.createElement("div")
  div.className = "item_block shad"
  div.id = id
  div.value = "test"
  imgb = document.createElement("div")
  imgb.className = "imgb"

  description = document.createElement("div")
  description.className = "description"

  zag = document.createElement("p")
  zag.className = "zag"
  zag.innerHTML = item

  dec = document.createElement("p")
  dec.className = "dec"
  dec.innerHTML = desc

  img = document.createElement("img")
  img.src = image

  description.appendChild(zag)
  description.appendChild(dec)
  imgb.appendChild(img)
  div.appendChild(imgb)
  div.appendChild(description)
  content = document.querySelector(".contentbody shad")

  document.querySelector(".content_body").appendChild(div)
}

function getItemsAndCategories() {
fetch("http://127.0.0.1:8000/categories")
.then(res => res.json())
.then(data =>{
subcateg = data[1]
categ = data[0]
item = data[2]
subcateg_len = Object.keys(subcateg).length
categ_len = Object.keys(categ).length
item_len = Object.keys(item).length
let per = 0
  for(let i=0; i < categ_len; i++){
    block = document.createElement("div")
    block.className = "block"
    block_cat = document.createElement("div")
    block_cat.className = "block_child dark"
    p_cat = document.createElement("p")
    p_cat.className = "category"
    p_cat.innerText = categ[i].category_name
    block_cat.appendChild(p_cat)
    block.appendChild(block_cat)
    for(let a=0; a < subcateg_len; a++){
      if(categ[i].category_id == subcateg[a].category_id){
        block_sub = document.createElement("div")
        block_sub.className = "block_child white"
        p_sub = document.createElement("p")
        p_sub.className = "subcategory"
        p_sub.innerText = subcateg[a].subcategories
        p_sub.id = subcateg[a].subcategories_id
        block_sub.appendChild(p_sub)
        for(let c=0; c < item_len; c++){
          if(parseInt(p_sub.id) == item[c].subcategory_id){
            p_sub.addEventListener("click",function(){
              objects = document.querySelectorAll(".item_block")
              for(let h = 0, max = objects.length; h < max; h++){
                if(objects[h].id != item[c].subcategory_id){
                  objects[h].remove()
                }
              }
              createItem(item[c].item_name, item[c].description, item[c].image, item[c].subcategory_id)
            })
          }
        }
        block.appendChild(block_sub)
        document.querySelector(".sidebar").appendChild(block)
      }
    }
  }
}
)}
 
getItemsAndCategories()