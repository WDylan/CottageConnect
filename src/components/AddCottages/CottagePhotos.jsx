import React from 'react'

const CottagePhotos = ({handleSubmit, handleFile}) => {
  
  const img = document.querySelector("img");
  document.querySelector("input").addEventListener("change", (e) => {
    const form = e.target.files[0];
    const data = new FormData();
    data.append(form.name, form);
    img.src = URL.createObjectURL(form);
  });
  
  return (
    <div>
      <form encType='multipart/form-data'>
      <label>Photo
        <input 
          type="file"
          name='photo'
          onChange={handleFile}
        />
      </label>
      <img src="" alt="" />
      <button onClick={ handleSubmit }>Envoyer</button>
      </form>
    </div>
  )
}

export default CottagePhotos