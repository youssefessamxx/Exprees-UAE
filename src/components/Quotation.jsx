import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

function Quotation() {
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    vin: "",
    fuel_type: "",
    engine_type: "",
    engine_capacity: "",
    mileage: "",
    condition: "",
  });

  const engineTypes = ["Diesel", "Petrol", "Electric"];
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"];
  const conditionTypes = ["New", "Used"];
  const years = Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => 1900 + i).reverse();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ["brand", "year"].includes(name)
        ? value ? parseInt(value) : ""
        : ["engine_capacity", "mileage"].includes(name)
        ? value ? parseFloat(value) : ""
        : value,
    }));
  };

  const validateForm = () => {
    if (!formData.brand || typeof formData.brand !== "number") {
      setError("Brand ID must be a valid number");
      return false;
    }
    if (!formData.model || !formData.model.trim()) {
      setError("Model is required");
      return false;
    }
    if (!formData.year || !years.includes(formData.year)) {
      setError("Please select a valid year");
      return false;
    }
    if (!formData.color || !formData.color.trim()) {
      setError("Color is required");
      return false;
    }
    if (!formData.vin || !/^[A-HJ-NPR-Z0-9]{17}$/.test(formData.vin)) {
      setError("Please enter a valid 17-character VIN");
      return false;
    }
    if (!fuelTypes.includes(formData.fuel_type)) {
      setError("Fuel type must be one of: Gasoline, Diesel, Electric, or Hybrid");
      return false;
    }
    if (!engineTypes.includes(formData.engine_type)) {
      setError("Engine type must be Diesel, Petrol, or Electric");
      return false;
    }
    if (!formData.engine_capacity || isNaN(formData.engine_capacity)) {
      setError("Engine capacity must be a valid number");
      return false;
    }
    if (!formData.mileage || isNaN(formData.mileage)) {
      setError("Mileage must be a valid number");
      return false;
    }
    if (!conditionTypes.includes(formData.condition)) {
      setError("Condition must be New or Used");
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    setFormData({
      brand: "",
      model: "",
      year: "",
      color: "",
      vin: "",
      fuel_type: "",
      engine_type: "",
      engine_capacity: "",
      mileage: "",
      condition: "",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("authToken");
    try {
      const shippingResponse = await axios.post(
        "http://51.20.121.157/shipping/shipping-request/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (shippingResponse.status === 201) {
        const quotationData = {
          shipping_request: shippingResponse.data.id,
        };

        const quotationResponse = await axios.post(
          "http://51.20.121.157/shipping/quotation/",
          quotationData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (quotationResponse.status === 201) {
          setShowModal(true);
          handleCancel();
        }
      }
    } catch (err) {
      console.error("Error submitting quotation:", err);
      setError(err.response?.data?.message || "Quotation submission failed. Please try again.");
    }
  };

  return (
    <div>
      <header className="bg-[url(/public/static/images/quotation.png)] bg-cover bg-center h-[400px] flex items-center px-6">
        <h2 className="font-bold text-4xl text-[#F05B1F]">Get Quotation</h2>
      </header>
      <form onSubmit={handleSubmit} className="p-4">
        <h3 className="flex gap-1 text-[#F05B1F] font-bold">
          <img src="/static/images/car.png" alt="" />
          Car Data
        </h3>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 mt-5">
          <div>
            <label className="font-semibold text-xl mb-2 block">Brand ID</label>
            <input
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              type="number"
              placeholder="Enter brand ID (e.g., 2)"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />

            <label className="font-semibold text-xl mb-2 block">Model</label>
            <input
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              type="text"
              placeholder="Enter model name (e.g., Model X)"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />

            <label className="font-semibold text-xl mb-2 block">Color</label>
            <input
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              type="text"
              placeholder="Enter car color (e.g., Red)"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />

            <label className="font-semibold text-xl mb-2 block">VIN</label>
            <input
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              type="text"
              maxLength={17}
              placeholder="Enter 17-character VIN (e.g., 1HGCM82633A123456)"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold text-xl mb-2 block">Engine Capacity</label>
            <input
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              type="number"
              step="0.01"
              placeholder="Enter engine capacity in liters (e.g., 2.00)"
              name="engine_capacity"
              value={formData.engine_capacity}
              onChange={handleChange}
              required
            />

            <label className="font-semibold text-xl mb-2 block">Mileage</label>
            <input
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              type="number"
              step="0.01"
              placeholder="Enter mileage (e.g., 15000.50)"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              required
            />

            <label className="font-semibold text-xl mb-2 block">Year</label>
            <select
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select manufacturing year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <label className="font-semibold text-xl mb-2 block">Condition</label>
            <select
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select vehicle condition (New/Used)</option>
              {conditionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-xl mb-2 block">Fuel Type</label>
            <select
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              required
            >
              <option value="">Select fuel type</option>
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <label className="font-semibold text-xl mb-2 block">Engine Type</label>
            <select
              className="border-[1px] border-[#5f5f5f] block md:px-4 md:py-3 px-3 py-2 w-full mb-5 outline-none font-[600]"
              name="engine_type"
              value={formData.engine_type}
              onChange={handleChange}
              required
            >
              <option value="">Select engine type (Diesel/Petrol/Electric)</option>
              {engineTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-black md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
          >
            Send
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
}

export default Quotation;