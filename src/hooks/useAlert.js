import {useState} from 'react'

const useAlert = () => {
  const [alert , setAlert] = useState({show:false , text:'', type:'danger'})
// we will take text and type as parameter as it will we changed and 
// showAlert will call setAlert

  const showAlert = ({text,type ='danger'}) => setAlert({
    show: true,
    text,
    type

  })
  const hideAlert = () => setAlert({
    show: false,
    text:"",
    type:'danger'

  })

  return{alert, showAlert,hideAlert}  // these object does not return jsx but object
  
}

export default useAlert
