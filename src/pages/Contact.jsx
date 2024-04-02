import {useState , useRef, Suspense} from 'react';
import emailjs from '@emailjs/browser';
import fox from '../models/Fox';

const contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({name:'', email:'',message:''});
  // we will create a loading state
 const [isLoading ,setIsLoading] = useState(false);
 // we will use setform and in parameter 1st spread out using 3 dot ...


  const handleChange = (e) => {
    setForm ({...form,[e.target.name] : e.target.value})
  };
  const handleFocus =() => {};
  const handleBlur = () =>{};
  const handleSubmit =(e) =>{
    e.preventDefault();
    setIsLoading(true); // we want to initate sending email

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
      setForm({name:'', email:'',message:''});

    }).catch((error) => {
      setIsLoading(false);
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
        <canvas
        camer={{
          position: [0,0,5]
        }}
        >
          <Suspense fallback={null}>
            <fox/>
          </Suspense>


        </canvas>
      </div>
    </section>
  )
}

export default contact
