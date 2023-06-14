function setMultiLineText(objKey, targetId) {
  const multiLineText = pro_obj[objKey].multi_line;
  const modifiedText = multiLineText.replace(/(\r\n|\r|\n)/g, "<br>");
  document.getElementById(targetId).innerHTML = modifiedText;
}

  
  // Example usage: Assuming you have an HTML element with id "comp_id"
  






const render_product = (val) => {
  console.log(val);
    // Find the product with the matching ID
    const foundProduct = Object.values(pro_obj).find(p => p.id === val);
  
    if (foundProduct) {
      console.log("Product found:", foundProduct);
      // set list
      setMultiLineText(val, "comp_discription1")
    } 
  };
  
  // console.log(pro_obj);
  