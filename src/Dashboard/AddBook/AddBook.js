import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = data => {
        const bookImage = data.bookImage[0]
        const formData = new FormData()
        formData.append("image", bookImage)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgDbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result.data.display_url)
                if (result.data.display_url) {
                    const dt = new Date();

                    const timeString = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
                    console.log(timeString)
                    const bookInfo = {
                        bookName: data?.bookName,
                        authorName: data?.authorName,
                        bookPrice: data?.bookPrice,
                        bookDescription: data?.bookDescription,
                        bookType: data?.bookType,
                        bookImage: result.data.display_url,
                        dataTime: timeString

                    }
                    console.log(process.env.REACT_APP_URL)

                    fetch(`${process.env.REACT_APP_URL}/addBook`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(bookInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data?.acknowledged) {
                                toast.success(`${bookInfo.bookName} successfully added!`)
                                reset()
                                navigate("../../categories")
                            }

                        })
                        .catch(er => console.log(er))


                }
            })
            .catch(er => console.log(er))
    }
    return (
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-1/3 my-5 flex flex-col gap-y-2'>
                <input {...register("bookName", { required: true })} name='bookName' type="text" placeholder="Book Name" className="input input-bordered w-full" />
                <input {...register("authorName", { required: true })} name='authorName' type="text" placeholder="Author Name" className="input input-bordered w-full" />
                <input {...register("bookPrice", { required: true })} name='bookPrice' type="number" placeholder="Book Price" className="input input-bordered w-full" />
                <textarea {...register("bookDescription", { required: true })} name='bookDescription' className="textarea textarea-bordered w-full" placeholder="Description"></textarea>
                <select {...register("bookType", { required: true })} className="select select-bordered w-full ">
                    <option disabled selected>Selet Book Type..</option>
                    <option value="children">Children</option>
                    <option value="history">History</option>
                    <option value="arts & photography">Arts & Photography</option>
                    <option value="business & money">Business & money</option>
                    <option value="biographies & memoirs">Biographies & Memoirs</option>
                </select>
                <input {...register("bookImage", { required: true })} name='bookImage' type="file" className="file-input w-full" />
                <button className='btn btn-dark w-full' type='submit'>ADD BOOK</button>
            </form>
        </div>
    );
};

export default AddBook;