import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdminToken from '../useToken/useAdminToken';
import useToken from '../useToken/useToken';

const SignIn = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const { signInWithEmail } = useContext(AuthContext)
    const [error, serError] = useState("")
    const [email, setEmail] = useState(null)
    const token = useToken(email)
    if (token) {
        navigate(from, { replace: true })

    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        console.log(data)
        signInWithEmail(data?.email, data?.password)
            .then(result => {
                console.log(result.user)
                setEmail(data?.email)
                reset()
            })
            .catch(er => {
                serError(er.message)
            })
    }

    return (
        <div className='flex justify-center mt-20'>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                            {errors.email && errors.email.type === "required" && <span className='text-sm text-red-600'>This is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: true })} type="text" placeholder="password" className="input input-bordered" />
                            {errors.password && errors.password.type === "required" && <span className='text-sm text-red-600'>This is required</span>}

                            <label className="label">
                                <Link to="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        {
                            error && <span className='text-sm text-red-600'>{error}</span>
                        }
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p className="label-text-alt">Not a member? <Link className='link link-hover text-primary font-semibold' to="../signUp">sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;