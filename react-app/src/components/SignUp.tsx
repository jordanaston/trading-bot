import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useCreateUser from "../hooks/useCreateUser";

function SignUp() {
  const { register, handleSubmit } = useForm<FieldValues>();
  const mutation = useCreateUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await mutation.mutateAsync({
        email: data.email as string,
        password: data.password as string,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="border rounded-xl max-w-lg mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <div>
          <button
            className="w-full py-2 mt-4 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
