import {useState , useRef, Suspense} from 'react';
import emailjs from '@emailjs/browser';
import Fox from '../models/Fox';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/loader';
import useAlert from '../hooks/useAlert';

const contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({name:'', email:'',message:''});
  // we will create a loading state
 const [isLoading ,setIsLoading] = useState(false);
 // we will use setform and in parameter 1st spread out using 3 dot ...
const [currentAnimation,setCurrentAnimation] = useState('idle');
const [alert , showAlert , hideAlert] = useAlert();

  const handleChange = (e) => {
    setForm ({...form,[e.target.name] : e.target.value})
  };
  const handleFocus =() =>setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');
  const handleSubmit =(e) =>{
    e.preventDefault();
    setIsLoading(true); // we want to initate sending email
    setCurrentAnimation('hit');
    //to use emailjs we need to have sendId publicId for which we will visit emaijs
      
    emailjs.send(
      //we will create a .env.local file and put service id 
      // template id and  public key then we will import
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
     {
      from_name: form.name,
      to_name:"william",
      from_email: form.email,
      to_email:'greyfullbuster158@gmail.com',
      message: form.message
     },
     import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY

     // as it is an asynconomious we need then and catch
    ).then(()=>{
      setIsLoading(false);
      //todo: show success message
      //todo : hide  from and alert
      setTimeout(()=>{
        setCurrentAnimation('idle')
        setForm({name:'', email:'',message:''});
      },[3000])

    }).catch((error) => {
      setIsLoading(false);
      setCurrentAnimation('idle');
      console.log(error)
      // todo : show error message
    })
  };


  return (
    <section className="relative flex lg:flex-row fl selection:x-col max-container">
      <div className='flex-1 min-w-[50%] flex flex-c selection:l'>
        <h1 className='head-text'> Get in Touch</h1>
        <form className="w-full flex flex-col gap-7 mt-14 "onSubmit={handleSubmit} >
          

          <label className='text-black-500 font-semibold'>
            Name
             <input
              type='text'
               name='name'
              className='input'
              placeholder='Jacob'
              required   // required is improtant 
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />

          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
            type='email'
            name='email'
            className='input'
            placeholder='name@email.com'
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />

          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
            name='message'
            row={4}
            className='input'
            placeholder='Your message'
            required
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />

          </label>
          <button className='btn'
          type='submit'
          //if is loading is true then btn will be disabled
          disabled={isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          > {isLoading? 'sending..' : 'send Message'}</button>
        </form>

      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px]  h-[350px]'>
        <Canvas
        camer={{
          position: [0,0,5],
          fov:75, //feel of view
          near:0.14,
          far:1000

        }}
        >
          <directionalLight intensity={2.5} position={[0,0,1]}/>
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader/>}> 
            <Fox
            currentAnimation={currentAnimation}
            position={[0.5,0.35,0]}
            rotation={[12.6,-0.6,0]}
            scale={[0.5,0.5,0.5]}
            />
          </Suspense>


        </Canvas>
      </div>
    </section>
  )
}

export default contact
