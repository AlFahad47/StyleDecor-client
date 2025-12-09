import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit, FaPlus, FaSpinner } from "react-icons/fa"; // Added FaSpinner
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxios();
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_image_host_key
  }`;

  const { data: services = [], refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosPublic.get("/services");
      return res.data;
    },
  });

  const openAddModal = () => {
    setEditingService(null);
    setImageError("");
    reset({
      name: "",
      category: "default",
      price: "",
      unit: "",
      description: "",
      image: [],
    });
    document.getElementById("service_modal").showModal();
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setImageError("");
    reset({
      name: service.service_name,
      category: service.category,
      price: service.price,
      unit: service.unit,
      description: service.description,
      image: [],
    });
    document.getElementById("service_modal").showModal();
  };

  const onSubmit = async (data) => {
    setImageError("");

    if (!editingService && (!data.image || data.image.length === 0)) {
      setImageError("Image is required for new services!");
      return;
    }

    setLoading(true); // Start Loading
    let imageUrl = editingService?.img || "";

    try {
      if (data.image && data.image.length > 0) {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: { "content-type": "multipart/form-data" },
        });
        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        }
      }

      const serviceData = {
        service_name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        unit: data.unit,
        description: data.description,
        img: imageUrl,
      };

      let res;
      if (editingService) {
        res = await axiosSecure.patch(
          `/services/${editingService._id}`,
          serviceData
        );
      } else {
        res = await axiosSecure.post("/services", serviceData);
      }

      if (res.data.insertedId || res.data.modifiedCount > 0) {
        refetch();
        document.getElementById("service_modal").close();
        Swal.fire({
          title: "Success",
          text: editingService ? "Service updated!" : "Service added!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (service) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/services/${service._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Service has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Services</h2>
        <button onClick={openAddModal} className="btn btn-primary">
          <FaPlus /> Add New Service
        </button>
      </div>

      <div className="w-full">
        <table className="w-full ">
          <thead className="hidden md:table-header-group bg-base-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Service Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-4 md:table-row-group">
            {services.map((service, index) => (
              <tr
                className="flex flex-col md:table-row bg-base-200 md:bg-transparent shadow-md md:shadow-none rounded-xl md:rounded-none border md:border-b p-4 md:p-0"
                key={service._id}
              >
                <td className="flex justify-between md:table-cell md:p-3 py-1 ">
                  <span className="font-bold md:hidden text-gray-500">#</span>
                  <span className="font-bold text-primary-content md:font-normal md:text-inherit">
                    {index + 1}
                  </span>
                </td>
                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <div className="avatar">
                    <div className="rounded-lg  w-12 h-12">
                      <img src={service.img} alt="Service" />
                    </div>
                  </div>
                </td>

                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <span className="font-bold md:hidden text-gray-500">
                    Name
                  </span>
                  <span className="text-sm md:text-base break-all">
                    {service.service_name}
                  </span>
                </td>
                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <span className="font-bold md:hidden text-gray-500">
                    Price
                  </span>
                  <span className="text-sm md:text-base break-all">
                    {service.price} BDT
                  </span>
                </td>
                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <span className="font-bold md:hidden text-gray-500">
                    Category
                  </span>
                  <span className="text-sm md:text-base break-all">
                    {service.category}
                  </span>
                </td>

                <td className="flex justify-between items-center   md:table-cell md:p-3  py-1 border-t md:border-none mt-2 md:mt-0  space-x-2.5 ">
                  <button
                    onClick={() => openEditModal(service)}
                    className="btn btn-ghost btn-sm bg-orange-500 text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service)}
                    className="btn btn-ghost btn-sm bg-red-600 text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="service_modal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">
            {editingService
              ? `Edit Service: ${editingService.service_name}`
              : "Add New Service"}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Service Name*</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
            </div>

            <div className="flex gap-4 mb-3">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Category*</span>
                </label>
                <select
                  defaultValue="default"
                  {...register("category", {
                    required: true,
                    validate: (v) => v !== "default",
                  })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select Category
                  </option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Price (BDT)*</span>
                </label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Unit*</span>
                </label>
                <input
                  {...register("unit", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">
                    {editingService
                      ? "Update Image (Optional)"
                      : "Service Image*"}
                  </span>
                </label>
                <input
                  {...register("image")}
                  type="file"
                  className="file-input file-input-bordered w-full"
                />

                {imageError && (
                  <span className="text-red-500 text-sm mt-1">
                    {imageError}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Description*</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered h-24"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("service_modal").close()}
              >
                Cancel
              </button>

              {/* button loading*/}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    {editingService ? "Updating..." : "Adding..."}
                  </>
                ) : editingService ? (
                  "Update Service"
                ) : (
                  "Add Service"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageServices;
