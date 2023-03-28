import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useToken from '../useToken/useToken';

const SignUp = () => {
    const { signUpWithEmail, updataName } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const token = useToken(email, name)
    if (token) {
        navigate("/")
    }

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            return setError("Not match password")
        }

        signUpWithEmail(data?.email, data?.password)
            .then(result => {
                console.log(result.user)
                const profile = {
                    displayName: data?.name
                }
                userUpdate(profile, data?.email, data?.name)
            })
            .catch(er => {
                setError(er.message)
            })

    };

    const userUpdate = (profile, email, name) => {
        console.log(name)
            updataName(profile)
            .then(() => {

                setName(name)
                setEmail(email)
                reset()
            })
            .catch(er => console.log(er))
    }
    return (
        <div className='flex justify-center mt-20'>

            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control" >
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                            {errors.name && errors.name.type === "required" && <span className='text-sm text-red-600'>This is required</span>}
                        </div>
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
                            <input {...register("password", {
                                required: true,
                                minLength: 8,
                                pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*\W)(?!.* )/i

                            })} type="text" placeholder="password" className="input input-bordered" />
                            {errors.password && errors.password.type === "required" && <span className='text-sm text-red-600'>This is required</span>}
                            {errors.password && errors.password.type === "minLength" && <span className='text-sm text-red-600'>password should be 8 charcter long</span>}
                            {errors.password && errors.password.type === "pattern" && <span className='text-sm text-red-600'>Must conatains at least one uppercase letter,one number and one special character</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input {...register("confirmPassword", { required: true })} type="text" placeholder="Confirm password" className="input input-bordered" />
                            {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className='text-sm text-red-600'>This is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Login</button>
                        </div>
                        {
                            error && <span className='text-sm text-red-600'>{error}</span>
                        }
                    </form>
                    <p className="label-text-alt">Already have an account? <Link className='link link-hover text-primary font-semibold' to="../signIn">sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;