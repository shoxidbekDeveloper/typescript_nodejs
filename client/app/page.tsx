"use client"
import { FormEvent, useState } from 'react';
// import { types } from 'util';


type userFormType = {
  name: string,
  surname: string,
  age: number,
  username: string,
  password: string,
  status: string,
}
const Home = () => {
  const [formData, setFormData] = useState<userFormType>();
  const [image, setImage] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<Object>()

  const getValues = (e: any) => {
    setFormData((setPrivate: any) => ({
      ...setPrivate,
      [e.target.name]: e?.target?.value
    })
    )
  }
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    console.log(formData);
    console.log(uploadFile);
    console.log(image);

  }

  return (
    <main className="w-full h-[100vh] bg-gray-200">
      <div className="w-1/2 m-auto min-h-1/2 bg-green-800">
        <form className=" p-4" onSubmit={handleSubmit}>
          <h2 className=" text-2xl font-bold text-center text-cyan-50">User add</h2>
          <div className="text-center">
            <label htmlFor="name" className=" block text-left mb-2 text-cyan-50"><span className=" text-cyan-50"> *</span>Name</label>
            <input value={formData?.name} type="text" id="name" name='name' className="w-full p-2 mb-2" onChange={getValues} />
            <label htmlFor="surname" className=" block text-left mb-2 text-cyan-50"><span className=" text-cyan-50"> *</span>Surname</label>
            <input value={formData?.surname} type="text" id="surname" name='surname' className="w-full p-2 mb-2" onChange={getValues} />
            <label htmlFor="age" className=" block text-left mb-2 text-cyan-50"><span className=" text-cyan-50"> *</span>Age</label>
            <input value={formData?.age} type="number" id="age" name='age' className="w-full p-2 mb-2" onChange={getValues} />
            <label htmlFor="username" className=" block text-left mb-2 text-cyan-50"><span className=" text-cyan-50"> *</span>username</label>
            <input value={formData?.username} type="text" id="username" name='username' className="w-full p-2 mb-2" onChange={getValues} />
            <label htmlFor="password" className=" block text-left mb-2 text-cyan-50"><span className=" text-cyan-50"> *</span>password</label>
            <input value={formData?.password} type="password" id="password" name='password' className="w-full p-2 mb-2" onChange={getValues} />
            <label htmlFor="status" className=" block text-left mb-2 text-cyan-50"><span className=" text-cyan-50"> *</span>status</label>
            <input value={formData?.status} type="text" id="status" name='status' className="w-full p-2 mb-2" onChange={getValues} />
            <label htmlFor="avatar" className=" block text-left mb-2 text-cyan-50"><span className=" text-cyan-50"> *</span>Rasm</label>
            <input type="file" id="avatar" name='avatar' className="w-full p-2 mb-2" onChange={(e: any) => {
              e ? setImage(window.URL.createObjectURL(e.target.files[0])) : setImage("")

              setUploadFile(e.target.files[0])
            }} />
          </div>
          <button className="p-2  bg-cyan-500 text-cyan-50 mt-5">Add user</button>
        </form>


      </div>
      <img src={image ? image : ""} className='w-1/4 h-1/4' />
    </main>
  )
}

export default Home;
