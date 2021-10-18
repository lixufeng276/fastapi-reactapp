import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
import "./dropzone.css"
function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      const formData = new FormData();
      //appending files to formData
      formData.append('file', acceptedFiles[0]);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      };

      // Display the key/value pairs
      // for (var pair of formData.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }

      // console.log(requestOptions)

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
      
      const response = axios.post('http://localhost:8000/uploadfile/', 
        formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      }).then(res => {
        console.log({res});
      }).catch(err => {
        console.error({err})
      });
    })

    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default MyDropzone;
