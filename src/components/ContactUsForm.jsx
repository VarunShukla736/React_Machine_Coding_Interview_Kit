import react, { useState } from "react";

const contactUsForm = () => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    console.log(await response.json());
    alert("Form submitted successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setLoading(false);
  };

  return (
    <div className="py-8 w-3/12 mx-auto">
      <h1 className="text-2xl mb-5 font-bold ">Contact Us Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="name" className="font-semibold">
          Name:
        </label>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={formdata.name}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />
        <label htmlFor="email" className="font-semibold">
          Email:
        </label>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />
        <label htmlFor="message" className="font-semibold">
          Message:
        </label>
        <textarea
          placeholder="message"
          value={formdata.message}
          name="message"
          onChange={handleChange}
          rows="5"
          className="border p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-teal-700 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default contactUsForm;
